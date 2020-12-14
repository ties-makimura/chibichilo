import { Topic } from "types/book";
import { format } from "date-fns";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Video from "$organisms/Video";
import Item from "$atoms/Item";
import useCardStyles from "styles/card";

const useStyles = makeStyles((theme) => ({
  video: {
    marginTop: theme.spacing(-2),
    marginRight: theme.spacing(-3),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(-3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  items: {
    "& > *": {
      display: "inline-block",
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
  description: {
    whiteSpace: "pre",
  },
}));

type Props = Topic & { onEnded?: () => void };

export default function TopicPlaer(props: Props) {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const {
    name,
    resource,
    timeRequired,
    createdAt,
    updatedAt,
    creator,
    description,
    onEnded,
  } = props;
  return (
    <Card classes={cardClasses}>
      <Video
        className={classes.video}
        providerUrl="https://www.youtube.com/" // TODO: resource が video ならば video.providerUrl を使いたい
        url={resource.url}
        subtitles={[]}
        onEnded={onEnded}
        autoplay
      />
      <Typography className={classes.title} variant="h5">
        {name}
      </Typography>
      <div className={classes.items}>
        <Typography className={classes.title} variant="h6">
          学習時間{timeRequired}分
        </Typography>
        <Typography className={classes.title} variant="h6">
          日本語
        </Typography>
        <Typography className={classes.title} variant="h6">
          ライセンス
        </Typography>
      </div>
      <div className={classes.items}>
        <Item itemKey="作成日" value={format(createdAt, "yyyy.MM.dd")} />
        <Item itemKey="更新日" value={format(updatedAt, "yyyy.MM.dd")} />
        <Item itemKey="著者" value={creator.name} />
      </div>
      <p className={classes.description}>{description}</p>
    </Card>
  );
}
