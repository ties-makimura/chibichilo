import { FastifySchema } from "fastify";
import { bookSchema } from "$server/models/book";
import { BookParams, bookParamsSchema } from "$server/validators/bookParams";
import findBook from "$server/utils/book/findBook";

export const showSchema: FastifySchema = {
  description: "ブックの詳細の取得",
  params: bookParamsSchema,
  response: {
    200: bookSchema,
    404: {},
  },
};

export async function show({ params }: { params: BookParams }) {
  const { book_id: bookId } = params;
  const book = await findBook(bookId);

  return {
    status: book == null ? 404 : 200,
    body: book,
  };
}