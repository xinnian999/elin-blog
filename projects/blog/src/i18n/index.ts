interface Locale {
  label: string;
  value: Lang;
}

// 系统支持的语言列表
export const locales: Locale[] = [
  { label: "English", value: "en" },
  { label: "中文", value: "zh" },
];

export const defaultLang: Lang = "en";

export { default as translations } from "./translations";
