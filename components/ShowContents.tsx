import { ContentsWithState } from "components/contents";

export function ShowContents(props: ContentsWithState) {
  return <pre>{JSON.stringify(props, null, 2) /* Debug */}</pre>;
}
