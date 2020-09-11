import {
  SetStateAction,
  FormEvent,
  KeyboardEvent,
  useCallback,
  Dispatch,
} from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { validUrl } from "./validUrl";

const defaultLabel = "動画URLまたはファイル名";
const label = {
  youtube: "YouTube動画のURLまたはビデオID",
  wowza: defaultLabel,
};
const defaultAdornment = null;
const adornment = {
  youtube: "https://www.youtube.com/watch?v=",
  wowza: defaultAdornment,
};

export type VideoLocation = {
  type: "youtube" | "wowza";
  src: string;
};

const hosts = [
  {
    type: "youtube" as const,
    reg: /(^|\.)youtube\.com$/,
  },
];

function hostMatcher(reg: RegExp, host: string): boolean {
  return reg.test(host);
}

function videoLocationType(url: URL): VideoLocation["type"] {
  const type = hosts.find(({ reg }) => hostMatcher(reg, url.host))?.type;
  return type ?? "wowza";
}

function parse(value: string): SetStateAction<VideoLocation> {
  if (!validUrl(value)) {
    return (prev: VideoLocation) => ({ ...prev, src: value });
  }
  const url = new URL(value);
  switch (videoLocationType(url)) {
    case "youtube": {
      const src = url.searchParams.get("v") ?? "";
      return () => ({ type: "youtube", src });
    }
    case "wowza":
    default:
      return () => ({ type: "wowza", src: value });
  }
}

function useInputHandler(dispatch: Dispatch<SetStateAction<VideoLocation>>) {
  const handler = (event: FormEvent<HTMLInputElement>) => {
    dispatch(parse(event.currentTarget.value));
  };
  return useCallback(handler, [dispatch]);
}

function useKeyDownHandler(dispatch: Dispatch<SetStateAction<VideoLocation>>) {
  const handler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Backspace") return;
    if (event.currentTarget.value === "") {
      dispatch({ type: "wowza", src: "" });
    }
  };
  return useCallback(handler, [dispatch]);
}

export function VideoLocationField(props: {
  name: string;
  location: VideoLocation;
  setLocation: Dispatch<SetStateAction<VideoLocation>>;
}) {
  const inputHandler = useInputHandler(props.setLocation);
  const keyDownHandler = useKeyDownHandler(props.setLocation);

  return (
    <TextField
      name={props.name}
      label={label[props.location.type]}
      value={props.location.src}
      variant="filled"
      required
      fullWidth
      color="secondary"
      inputProps={{
        onInput: inputHandler,
        onKeyDown: keyDownHandler,
      }}
      InputProps={{
        startAdornment: adornment[props.location.type] && (
          <InputAdornment position="start">
            {adornment[props.location.type]}
          </InputAdornment>
        ),
      }}
    />
  );
}
