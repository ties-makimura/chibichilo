export default { title: "organisms/ActionHeader" };

import ActionHeader from "./ActionHeader";
import Button from "@mui/material/Button";

export const Default = () => (
  <ActionHeader
    title="タイトル"
    action={
      <Button color="primary" variant="contained">
        ボタン
      </Button>
    }
  />
);

export const UseContainer = () => (
  <ActionHeader
    maxWidth="sm"
    title="タイトル"
    action={
      <Button color="primary" variant="contained">
        ボタン
      </Button>
    }
  />
);
