import { useRouter } from "next/router";
import type { BookSchema } from "$server/models/book";
import { useSessionAtom } from "$store/session";
import Books from "$templates/Books";
import useBooks from "$utils/useBooks";
import { pagesPath } from "$utils/$path";
import { TopicSchema } from "$server/models/topic";

const UserBooks = (
  props: Omit<Parameters<typeof Books>[0], keyof ReturnType<typeof useBooks>>
) => <Books {...props} {...useBooks()} />;

function Index() {
  const router = useRouter();
  const { isBookEditable, isTopicEditable } = useSessionAtom();
  const handlers = {
    onBookClick({ id }: Pick<BookSchema, "id">) {
      return router.push(pagesPath.book.$url({ query: { bookId: id } }));
    },
    onBookEditClick(book: Pick<BookSchema, "id" | "author">) {
      const action = isBookEditable(book) ? "edit" : "generate";
      return router.push(
        pagesPath.book[action].$url({
          query: { context: "books", bookId: book.id },
        })
      );
    },
    onBookNewClick() {
      return router.push(
        pagesPath.book.new.$url({ query: { context: "books" } })
      );
    },
    onTopicEditClick({ id }: Pick<TopicSchema, "id">) {
      return router.push(
        pagesPath.books.topic.edit.$url({
          query: { topicId: id },
        })
      );
    },
    isTopicEditable,
  };

  return <UserBooks {...handlers} />;
}

export default Index;
