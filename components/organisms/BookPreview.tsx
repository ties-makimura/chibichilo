import { useState } from "react";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import Card from "@material-ui/core/Card";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "$atoms/IconButton";
import CourseChip from "$atoms/CourseChip";
import SharedIndicator from "$atoms/SharedIndicator";
import DescriptionList from "$atoms/DescriptionList";
import Video from "$organisms/Video";
import useCardStyle from "styles/card";
import { BookSchema } from "$server/models/book";
import { TopicSchema } from "$server/models/topic";
import { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import { getSectionsOutline } from "$utils/outline";
import { gray } from "$theme/colors";
import useLineClampStyles from "$styles/lineClamp";
import getLocaleDateString from "$utils/getLocaleDateString";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  left: {
    flex: 1,
    paddingRight: theme.spacing(1),
  },
  right: {
    flexShrink: 0,
    width: "30%",
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
  },
  outline: {
    margin: 0,
    color: gray[700],
  },
  shared: {
    margin: theme.spacing(0, 1),
  },
  chips: {
    "& > *": {
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
  items: {
    "& > *": {
      display: "inline-block",
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
}));

type Props = {
  book: BookSchema;
  onBookPreviewClick?(book: BookSchema): void;
  onBookEditClick?(book: BookSchema): void;
  onLtiContextClick?(
    ltiResourceLink: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">
  ): void;
};

export default function BookPreview({
  book,
  onBookPreviewClick,
  onBookEditClick,
  onLtiContextClick,
}: Props) {
  const cardClasses = useCardStyle();
  const classes = useStyles();
  const titleClamp = useLineClampStyles({
    fontSize: "1.25rem",
    lineClamp: 2,
    lineHeight: 1.6,
  });
  const outlineClamp = useLineClampStyles({
    fontSize: "0.875rem",
    lineClamp: 3,
    lineHeight: 1.25,
  });
  const [topic] = useState<TopicSchema | undefined>(
    book.sections[0]?.topics[0]
  );
  const { ref, inView } = useInView({ rootMargin: "100px", triggerOnce: true });
  const handle = (handler?: (book: BookSchema) => void) => () => {
    handler?.(book);
  };
  return (
    <Card classes={cardClasses} className={classes.root}>
      <div className={classes.left}>
        <div className={clsx(classes.title, titleClamp.placeholder)}>
          <label className={titleClamp.clamp}>{book.name}</label>
          {book.shared && <SharedIndicator className={classes.shared} />}
          <IconButton
            tooltipProps={{ title: "ブックをプレビュー" }}
            color="primary"
            onClick={handle(onBookPreviewClick)}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
          {onBookEditClick && (
            <IconButton
              tooltipProps={{ title: "ブックを編集" }}
              color="primary"
              onClick={handle(onBookEditClick)}
            >
              <EditOutlinedIcon />
            </IconButton>
          )}
        </div>
        <div className={classes.chips}>
          {book.ltiResourceLinks.map((ltiResourceLink, index) => (
            <CourseChip
              key={index}
              ltiResourceLink={ltiResourceLink}
              onLtiResourceLinkClick={onLtiContextClick}
            />
          ))}
        </div>
        <DescriptionList
          className={classes.items}
          nowrap
          value={[
            { key: "作成日", value: getLocaleDateString(book.createdAt, "ja") },
            { key: "更新日", value: getLocaleDateString(book.updatedAt, "ja") },
            { key: "著者", value: book.author.name },
          ]}
        />
        <p
          className={clsx(
            classes.outline,
            outlineClamp.clamp,
            outlineClamp.placeholder
          )}
        >
          {getSectionsOutline(book.sections)}
        </p>
      </div>
      <div ref={ref} className={classes.right}>
        {topic && "providerUrl" in topic.resource && inView && (
          <Video {...topic.resource} />
        )}
      </div>
    </Card>
  );
}
