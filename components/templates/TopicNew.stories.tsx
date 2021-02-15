export default { title: "templates/TopicNew" };

import TopicNew from "./TopicNew";

const defaultProps = {
  onSubmit: console.log,
  onSubtitleDelete: console.log,
  onSubtitleSubmit: console.log,
  onCancel: () => console.log("back"),
};

export const Default = () => <TopicNew {...defaultProps} />;
