import request from "./request";
import { nowTime, formatTime } from "./timeUtils";
import getRandomId from "./getRandomId";

const globalConfig = {
  remoteStaticUrl: "https://cdn.hyl999.co/public",
};

export { request, nowTime, formatTime, globalConfig, getRandomId };
