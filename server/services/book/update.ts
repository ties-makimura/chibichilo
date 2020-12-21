import { FastifySchema } from "fastify";
import { BookProps, bookPropsSchema, bookSchema } from "$server/models/book";
import { BookParams, bookParamsSchema } from "$server/validators/bookParams";
import updateBook from "$server/utils/book/updateBook";
import { Session } from "$utils/session";

export const updateSchema: FastifySchema = {
  description: "ブックの更新",
  params: bookParamsSchema,
  body: bookPropsSchema,
  response: {
    201: bookSchema,
    400: {},
  },
};

export async function update({
  session,
  body,
  params,
}: {
  session: Session;
  body: BookProps;
  params: BookParams;
}) {
  if (!session.user) return { status: 400 };

  const created = await updateBook(session.user.id, {
    ...body,
    id: params.book_id,
  });

  return {
    status: created == null ? 400 : 201,
    body: created,
  };
}