import { Lang } from "@/interface";

interface Locale {
  label: string;
  value: Lang;
  data: Record<string, string>;
}

const locales: Locale[] = [
  {
    label: "中文",
    value: "zh",
    data: {
      "Nav Home": "首页",
      "Nav About": "关于",
    },
  },
  {
    label: "English",
    value: "en",
    data: {
      "Nav Home": "Home",
      "Nav About": "About",
    },
  },
];

export default locales;
