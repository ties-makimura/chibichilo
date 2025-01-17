import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import TextField from "$atoms/TextField";
import useCardStyles from "styles/card";
import useInputLabelStyles from "styles/inputLabel";
import gray from "theme/colors/gray";
import type { BookSchema } from "$server/models/book";
import type { BookPropsWithSubmitOptions } from "$types/bookPropsWithSubmitOptions";
import languages from "$utils/languages";

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:first-child)": {
      marginTop: theme.spacing(2.5),
    },
  },
  labelDescription: {
    marginLeft: theme.spacing(0.75),
    color: gray[600],
  },
  divider: {
    margin: theme.spacing(0, -3, 0),
  },
}));

const label = {
  create: {
    submit: "作成",
    submitWithLink: "作成したブックを提供",
  },
  update: {
    submit: "更新",
    submitWithLink: "更新したブックを提供",
  },
} as const;

type Props = {
  book?: BookSchema;
  topics?: number[];
  id?: string;
  linked?: boolean;
  className?: string;
  variant?: "create" | "update";
  onSubmit?: (book: BookPropsWithSubmitOptions) => void;
};

export default function BookForm({
  book,
  topics,
  className,
  id,
  linked = false,
  variant = "create",
  onSubmit = () => undefined,
}: Props) {
  const cardClasses = useCardStyles();
  const inputLabelClasses = useInputLabelStyles();
  const classes = useStyles();
  const defaultValues: BookPropsWithSubmitOptions = {
    name: book?.name ?? "",
    description: book?.description ?? "",
    shared: Boolean(book?.shared),
    language: book?.language ?? Object.getOwnPropertyNames(languages)[0],
    sections: book?.sections,
    submitWithLink: false,
  };
  const { handleSubmit, register, setValue } =
    useForm<BookPropsWithSubmitOptions>({
      defaultValues,
    });
  setValue("topics", topics);

  return (
    <Card
      classes={cardClasses}
      className={clsx(classes.margin, className)}
      id={id}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        inputProps={register("name")}
        label={
          <>
            タイトル
            <Typography
              className={classes.labelDescription}
              variant="caption"
              component="span"
            >
              学習者が学習範囲を簡潔に理解できるタイトルを設定できます
            </Typography>
          </>
        }
        required
        fullWidth
      />
      <div>
        <InputLabel classes={inputLabelClasses} htmlFor="shared">
          他の教員にシェア
        </InputLabel>
        <Checkbox
          id="shared"
          name="shared"
          onChange={(_, checked) => setValue("shared", checked)}
          defaultChecked={defaultValues.shared}
          color="primary"
        />
      </div>
      <TextField
        label="教材の主要な言語"
        select
        defaultValue={defaultValues.language}
        inputProps={register("language")}
      >
        {Object.entries(languages).map(([value, label]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label={
          <>
            解説
            <Typography
              className={classes.labelDescription}
              variant="caption"
              component="span"
            >
              <Link
                href="https://github.github.com/gfm/"
                target="_blank"
                rel="noreferrer"
              >
                GitHub Flavored Markdown
              </Link>
              に一部準拠しています
            </Typography>
          </>
        }
        fullWidth
        multiline
        inputProps={register("description")}
      />
      <Divider className={classes.divider} />
      {!linked && (
        <div>
          <InputLabel classes={inputLabelClasses} htmlFor="submit-with-link">
            {label[variant].submitWithLink}
          </InputLabel>
          <Checkbox
            id="submit-with-link"
            name="submitWithLink"
            onChange={(_, checked) => setValue("submitWithLink", checked)}
            defaultChecked={defaultValues.submitWithLink}
            color="primary"
          />
        </div>
      )}
      <Button variant="contained" color="primary" type="submit">
        {label[variant].submit}
      </Button>
    </Card>
  );
}
