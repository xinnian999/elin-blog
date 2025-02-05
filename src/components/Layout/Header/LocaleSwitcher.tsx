"use client";

import { ExpandIcon, LangIcon } from "@/components";
import { getUserLocale, setUserLocale } from "@/i18n/service";
import { locales } from "@/i18n/config";
import { useAsyncEffect } from "ahooks";
import { useEffect, useState } from "react";
import "dayjs/locale/zh-cn";
import { dayjsPlus } from "@/async";

const LocaleSwitcher = () => {
  const [lang, setLang] = useState<Lang>("zh");

  const onChangeLocale = async (locale: Lang) => {
    await setUserLocale(locale);
    setLang(locale);
  };

  useAsyncEffect(async () => {
    const l = await getUserLocale();

    if (l) {
      setLang(l);
    }
  }, []);

  // useEffect(() => {
  //   dayjsPlus.locale(lang === "zh" ? "zh-cn" : "en");
  // }, [lang]);

  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost">
        <LangIcon className="h-4 w-4" />
        <ExpandIcon className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {locales.map((item) => (
          <li key={item.label} onClick={onChangeLocale.bind(this, item.value)}>
            <a className={lang === item.value ? "active" : ""}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocaleSwitcher;
