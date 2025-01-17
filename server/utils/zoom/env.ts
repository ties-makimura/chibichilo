import format from "date-fns/format";
import utcToZoneTime from "date-fns-tz/utcToZonedTime";

import {
  ZOOM_API_KEY,
  ZOOM_API_SECRET,
  ZOOM_IMPORT_CONSUMER_KEY,
  ZOOM_IMPORT_INTERVAL,
  ZOOM_IMPORT_TO,
  ZOOM_IMPORT_WOWZA_BASE_URL,
} from "$server/utils/env";

export function validateSettings(logging = true) {
  if (
    !ZOOM_API_KEY ||
    !ZOOM_API_SECRET ||
    !ZOOM_IMPORT_CONSUMER_KEY ||
    !ZOOM_IMPORT_INTERVAL ||
    !ZOOM_IMPORT_TO
  ) {
    if (logging)
      logger(
        "INFO",
        `zoom import is disabled. ZOOM_API_KEY:${ZOOM_API_KEY} ZOOM_API_SECRET:${ZOOM_API_SECRET} ZOOM_IMPORT_CONSUMER_KEY:${ZOOM_IMPORT_CONSUMER_KEY} ZOOM_IMPORT_INTERVAL:${ZOOM_IMPORT_INTERVAL} ZOOM_IMPORT_TO:${ZOOM_IMPORT_TO}`
      );
    return false;
  }
  return validateWowzaSettings(logging);
}

function validateWowzaSettings(logging = true) {
  if (ZOOM_IMPORT_TO == "wowza" && !ZOOM_IMPORT_WOWZA_BASE_URL) {
    if (logging)
      logger(
        "INFO",
        `zoom import is disabled. ZOOM_IMPORT_WOWZA_BASE_URL is not defined.`
      );
    return false;
  }
  return true;
}

export function logger(level: string, output: string, error?: Error | unknown) {
  console.log(
    format(utcToZoneTime(new Date(), "Asia/Tokyo"), "yyyy-MM-dd HH:mm:ss"),
    level,
    output,
    "ZoomImportLog"
  );
  if (error instanceof Error) console.log(error.stack);
}
