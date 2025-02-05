import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { useLocale } from "next-intl";

dayjs.extend(relativeTime);

export default () => {
  const locale = useLocale();

  dayjs.locale(locale === "zh" ? "zh-cn" : "en");

  return dayjs;
};
