"use server";

import { cookies } from "next/headers";
import { defaultLang } from "@/i18n";

const LANG_NAME = "Elin_BLOG_LANG";

export async function getLang() {
  // 读取 cookie
  const lang: Lang =
    ((await cookies()).get(LANG_NAME)?.value as Lang) || defaultLang;

  return lang;
}

export async function setLang(lang: Lang) {
  (await cookies()).set(LANG_NAME, lang);
}
