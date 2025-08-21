"use client";

import { locales } from "@/i18n";
import "dayjs/locale/zh-cn";
import { LangIcon, ExpandIcon } from "@/icons";
import { setLang } from "@/async";
import { useContext } from "react";
import { GlobalContext } from "@/components";

const LocaleSwitcher = () => {
  const { lang } = useContext(GlobalContext);

  const onChangeLocale = async (locale: Lang) => {
    await setLang(locale);
  };

  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost sm:btn-sm md:btn-md">
        <LangIcon className="h-4 w-4" />
        <ExpandIcon className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base rounded-box z-[1] w-52 p-2 shadow flex flex-col gap-3"
      >
        {locales.map((item) => (
          <li key={item.label} onClick={onChangeLocale.bind(this, item.value)}>
            <a className={lang === item.value ? "menu-active" : ""}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocaleSwitcher;
