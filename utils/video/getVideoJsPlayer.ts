import videojs from "video.js";
import type { VideoJsPlayerOptions } from "video.js";
import hlsjsPlugin from "@meikidd/videojs-hlsjs-plugin/lib/videojs-hlsjs-plugin.js";
import ja from "video.js/dist/lang/ja.json";
import "videojs-youtube";
import "videojs-seek-buttons";
import getVideoHolder from "./getVideoHolder";

const defaultOptions: VideoJsPlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    // FIXME: https://github.com/videojs/videojs-youtube/issues/562
    pictureInPictureToggle: false,
  },
  playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  language: "ja",
  languages: { ja },
};

function getVideoJsPlayer(options: VideoJsPlayerOptions) {
  if (!videojs.getPlugin("streamrootHls")) {
    hlsjsPlugin.registerConfigPlugin(videojs);
  }
  // @ts-expect-error @types/video.js Unsupported
  if (!videojs.Html5Hlsjs) {
    hlsjsPlugin.registerSourceHandler(videojs);
  }
  const element = document.createElement("video-js");
  getVideoHolder().appendChild(element);
  element.classList.add("vjs-big-play-centered");
  const player = videojs(element, { ...defaultOptions, ...options });
  // @ts-expect-error: @types/video.js@^7.3.11 Unsupported
  player.seekButtons({
    forward: 15,
    back: 15,
  });
  return { element, player };
}

export default getVideoJsPlayer;
