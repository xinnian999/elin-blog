"use server";

import { getLang } from "./lang";
import { translations } from "@/i18n";

const getT = async () => {
  const lang = await getLang();

  const t = (key: string) => {
    return translations[lang][key];
  };

  return t;
};

export default getT;
