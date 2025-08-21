import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import useLang from "./useLang";

dayjs.extend(relativeTime);

export default () => {
  const locale = useLang();

  dayjs.locale(locale === "zh" ? "zh-cn" : "en");

  return dayjs;
};
