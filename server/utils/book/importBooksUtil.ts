import fs from "fs";
import path from "path";
import unzipper from "unzipper";
// @ts-expect-error Could not find a declaration file for module 'recursive-readdir-synchronous'
import recursive from "recursive-readdir-synchronous";
import format from "date-fns/format";
import utcToZoneTime from "date-fns-tz/utcToZonedTime";
import { Buffer } from "buffer";

import { validate, ValidationError } from "class-validator";
import { UserSchema } from "$server/models/user";
import { BookSchema } from "$server/models/book";
import {
  BooksImportParams,
  BooksImportResult,
  ImportTopic,
  ImportSection,
  ImportBook,
  ImportBooks,
} from "$server/validators/booksImportParams";
import prisma from "$server/utils/prisma";
import findBook from "./findBook";
import { parse as parseProviderUrl } from "$server/utils/videoResource";
import { scpUpload } from "$server/utils/wowza/scpUpload";

async function importBooksUtil(
  user: UserSchema,
  params: BooksImportParams
): Promise<BooksImportResult> {
  const util = new ImportBooksUtil(user, params);
  await util.importBooks();
  return util.result();
}

class ImportBooksUtil {
  user: UserSchema;
  params: BooksImportParams;
  books: BookSchema[];
  errors: string[];
  timeRequired: number;
  tmpdir?: string;
  unzippedFiles: string[];

  constructor(user: UserSchema, params: BooksImportParams) {
    this.user = user;
    this.params = params;
    this.books = [];
    this.errors = [];
    this.timeRequired = 0;
    this.unzippedFiles = [];
  }

  async importBooks() {
    try {
      const importBooks = ImportBooks.init(await this.parseJsonFromFile());
      if (this.errors.length) return;

      const results = await validate(importBooks, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      this.parseError(results);
      if (this.errors.length) return;

      if (this.tmpdir) {
        await this.uploadFiles(importBooks);
      }
      if (this.errors.length) return;

      const transactions = [];
      for (const importBook of importBooks.books) {
        transactions.push(
          prisma.book.create({ data: this.getBookProps(importBook) })
        );
      }
      if (this.errors.length) return;

      for (const book of await prisma.$transaction(transactions)) {
        const res = await findBook(book.id);
        if (res) this.books.push(res as BookSchema);
      }
    } catch (e) {
      console.error(e);
      this.errors.push(...(Array.isArray(e) ? e : [String(e)]));
    } finally {
      this.cleanUp();
    }
  }

  parseError(results: ValidationError[], parentLabel = "") {
    for (const result of results) {
      const label =
        parentLabel +
        (Number.isNaN(Number(result.property))
          ? parentLabel
            ? `.${result.property}`
            : result.property
          : `[${result.property}]`);
      for (const constraint in result.constraints) {
        if (constraint == "whitelistValidation") {
          this.errors.push(
            `${parentLabel}: 不明なプロパティ "${result.property}" が含まれています。`
          );
        } else if (constraint == "nestedValidation") {
          this.errors.push(`${parentLabel}: ${result.constraints[constraint]}`);
        } else {
          this.errors.push(`${label}: ${result.constraints[constraint]}`);
        }
      }
      if (result.children) {
        this.parseError(result.children, label);
      }
    }
  }

  result() {
    const result: BooksImportResult = {
      books: this.books,
      errors: this.errors,
    };
    return result;
  }

  cleanUp() {
    if (this.tmpdir) {
      fs.rmdirSync(this.tmpdir, { recursive: true });
    }
  }

  async parseJson() {
    if (this.params.file) {
      return await this.parseJsonFromFile();
    }

    try {
      return JSON.parse(this.params.json || "");
    } catch (e) {
      this.errors.push(`入力されたjsonテキストを解釈できません。\n${e}`);
      return {};
    }
  }

  parseJsonFromFile() {
    if (!this.params.file) {
      this.errors.push(`ファイルをアップロードしてください。`);
      return {};
    }

    this.tmpdir = fs.mkdtempSync("/tmp/chibichilo-import-");
    const file = `${this.tmpdir}/file`;
    fs.writeFileSync(file, Buffer.from(this.params.file as string, "base64"));

    return new Promise((resolve) => {
      fs.createReadStream(file)
        .pipe(unzipper.Extract({ path: this.tmpdir }))
        .on("close", () => {
          this.unzippedFiles = recursive(this.tmpdir);
          const jsonfiles: string[] = this.unzippedFiles.filter((filename) =>
            filename.toLowerCase().endsWith(".json")
          );
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const jsons: any[] = [];
          if (jsonfiles.length) {
            for (const jsonfile of jsonfiles) {
              try {
                const json = JSON.parse(fs.readFileSync(jsonfile).toString());
                jsons.push(...(Array.isArray(json) ? json : [json]));
              } catch (e) {
                this.errors.push(
                  `入力されたjsonテキストを解釈できません。\n${e}`
                );
              }
            }
          } else {
            this.errors.push("jsonファイルがありません。");
          }
          if (this.errors.length) {
            resolve({});
          } else {
            resolve(jsons);
          }
        })
        .on("error", (error) => {
          try {
            resolve(JSON.parse(fs.readFileSync(file).toString()));
          } catch (e) {
            this.errors.push(`ファイルがzipではありません。\n${error}`);
            resolve({});
          }
        });
    });
  }

  async uploadFiles(importBooks: ImportBooks) {
    const uploadroot = fs.mkdtempSync(`${this.tmpdir}/upload-wowza-`);
    // recursive:true が利かない https://github.com/nodejs/node/issues/27293
    const uploaddomain = fs.mkdirSync(
      `${uploadroot}/${this.user.ltiConsumerId}`,
      {
        recursive: true,
      }
    );
    const uploadauthor = fs.mkdirSync(`${uploaddomain}/${this.user.id}`, {
      recursive: true,
    });
    const uploaddir = fs.mkdtempSync(
      `${uploadauthor}/${format(
        utcToZoneTime(new Date(), "Asia/Tokyo"),
        "yyyyMMdd-HHmm"
      )}-`
    );
    const uploadsubdir = uploaddir.substring(uploadroot.length);

    const filenames = [];
    for (const importBook of importBooks.books) {
      for (const bookSection of importBook.sections) {
        for (const sectionTopic of bookSection.topics) {
          if (sectionTopic.resource.file) {
            const filename = path.basename(sectionTopic.resource.file);
            if (filenames.indexOf(filename) > -1) {
              this.errors.push(
                `ファイル ${filename} が重複しています。(サブフォルダはまとめられます)`
              );
            }

            const fullpath = this.unzippedFiles.find(
              (element) => path.basename(element) == filename
            );
            if (!fullpath) {
              this.errors.push(`ファイル ${filename} がありません。`);
              continue;
            }

            filenames.push(filename);
            sectionTopic.resource.providerUrl = this.params.provider;
            sectionTopic.resource.url = `${this.params.wowzaBaseUrl}${uploadsubdir}/${filename}`;
            fs.renameSync(fullpath, `${uploaddir}/${filename}`);
          } else {
            try {
              const parsedResource = parseProviderUrl(
                sectionTopic.resource.url
              );
              sectionTopic.resource.providerUrl =
                parsedResource?.providerUrl ??
                sectionTopic.resource.providerUrl;
              sectionTopic.resource.url =
                parsedResource?.url ?? sectionTopic.resource.url;
            } catch (e) {
              // nop
            }
          }
        }
      }
    }
    if (this.errors.length) return;
    if (!filenames.length) return;

    try {
      await scpUpload(uploadroot);
    } catch (e) {
      this.errors.push(`サーバーにアップロードできませんでした。\n${e}`);
    }
  }

  getBookProps(importBook: ImportBook) {
    const sections = [];
    for (const [index, bookSection] of importBook.sections.entries()) {
      sections.push(this.getSection(bookSection, index));
    }

    return {
      ...importBook,
      timeRequired: this.timeRequired,
      author: { connect: { id: this.user.id } },
      publishedAt: new Date(importBook.publishedAt),
      createdAt: new Date(importBook.createdAt),
      updatedAt: new Date(importBook.updatedAt),
      keywords: this.getKeywords(importBook.keywords),
      sections: { create: sections },
      ltiResourceLinks: {},
    };
  }

  getSection(bookSection: ImportSection, order: number) {
    const topicSections = [];
    for (const [index, sectionTopic] of bookSection.topics.entries()) {
      topicSections.push(this.getTopicSection(sectionTopic, index));
    }

    return {
      order,
      name: bookSection.name,
      topicSections: { create: topicSections },
    };
  }

  getTopicSection(sectionTopic: ImportTopic, order: number) {
    this.timeRequired += sectionTopic.timeRequired;

    const video = {
      create: {
        providerUrl: sectionTopic.resource.providerUrl,
        tracks: { create: sectionTopic.resource.tracks },
      },
    };

    const resource = {
      connectOrCreate: {
        create: {
          video,
          url: sectionTopic.resource.url,
          details: sectionTopic.resource.details,
        },
        where: { url: sectionTopic.resource.url },
      },
    };

    const topic = {
      ...sectionTopic,
      creator: { connect: { id: this.user.id } },
      createdAt: new Date(sectionTopic.createdAt),
      updatedAt: new Date(sectionTopic.updatedAt),
      keywords: this.getKeywords(sectionTopic.keywords),
      resource,
    };

    return { order, topic: { create: topic } };
  }

  getKeywords(keywords: string[]) {
    return {
      connectOrCreate: keywords.map((name) => {
        return { create: { name }, where: { name } };
      }),
    };
  }
}

export default importBooksUtil;
