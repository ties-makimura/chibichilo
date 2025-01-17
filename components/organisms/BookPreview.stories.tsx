import type { Story } from "@storybook/react";
import makeStyles from "@mui/styles/makeStyles";
import BookPreview from "./BookPreview";
import { book } from "$samples";

export default {
  title: "organisms/BookPreview",
  component: BookPreview,
};

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

const Template: Story<Parameters<typeof BookPreview>[0]> = (args) => {
  const classes = useStyles();
  return (
    <div className={classes.margin}>
      {[...Array(10)].map((_value, index) => (
        <BookPreview key={index} {...args} />
      ))}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  book,
};

export const EmptySection = Template.bind({});
EmptySection.args = {
  ...Default.args,
  book: { ...book, sections: [] },
};
