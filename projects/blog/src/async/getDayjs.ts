import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { getLocale } from "next-intl/server";

dayjs.extend(relativeTime);

export default async () => {
  const locale = await getLocale();
  dayjs.locale(locale === "zh" ? "zh-cn" : "en");

  return dayjs;
};
