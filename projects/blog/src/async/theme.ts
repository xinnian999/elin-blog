"use server";

import { cookies } from "next/headers";

const THEME_NAME = "Elin_BLOG_THEME";

export async function getTheme() {
  // 读取 cookie
  const theme: Theme =
    ((await cookies()).get(THEME_NAME)?.value as Theme) || "light";

  return theme;
}

export async function setTheme(theme: Theme) {
  (await cookies()).set(THEME_NAME, theme);
}
