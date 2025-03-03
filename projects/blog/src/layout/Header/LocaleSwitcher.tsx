"use client";

import { ExpandIcon, LangIcon } from "@/components";
import { setUserLocale } from "@/i18n/service";
import { locales } from "@/i18n/config";
import "dayjs/locale/zh-cn";
import { useLocale } from "next-intl";

const LocaleSwitcher = () => {
  const locale = useLocale();

  const onChangeLocale = async (locale: Lang) => {
    await setUserLocale(locale);
  };

  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost sm:btn-sm md:btn-md">
        <LangIcon className="h-4 w-4" />
        <ExpandIcon className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow flex flex-col gap-3"
      >
        {locales.map((item) => (
          <li key={item.label} onClick={onChangeLocale.bind(this, item.value)}>
            <a className={locale === item.value ? "active" : ""}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocaleSwitcher;
