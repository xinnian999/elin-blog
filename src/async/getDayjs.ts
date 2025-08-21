import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { getLang } from "./lang";

dayjs.extend(relativeTime);

export default async () => {
  const locale = await getLang();
  dayjs.locale(locale === "zh" ? "zh-cn" : "en");

  return dayjs;
};
