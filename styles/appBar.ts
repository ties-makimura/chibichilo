import makeStyles from "@mui/styles/makeStyles";
import { gray } from "theme/colors";

const appBar = makeStyles({
  root: {
    borderBottom: `1px solid ${gray[400]}`,
    boxShadow: "none",
  },
  colorDefault: {
    backgroundColor: "#fff",
  },
});

export default appBar;
