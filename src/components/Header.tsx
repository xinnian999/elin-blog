"use client";

import { locales } from "@/config";
import { useMounted, useT } from "@/hooks";
import useGlobalStore from "@/store/global";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import withAffix from "./hoc/withAffix";
import { DropdownIcon, ExpandIcon, LangIcon, MoonIcon, SunIcon } from "./Icon";

interface MenuItem {
  label: string;
  to?: string;
  children?: MenuItem[];
}

const Header = () => {
  const dark = useGlobalStore((state) => state.dark);
  const setDark = useGlobalStore((state) => state.setDark);
  const lang = useGlobalStore((state) => state.lang);
  const setLang = useGlobalStore((state) => state.setLang);

  const mounted = useMounted();

  const t = useT();

  const pathname = usePathname();

  const onChange = (e): void => {
    setDark(e.target.checked);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  const menus: MenuItem[] = [
    {
      label: t("Nav Home"),
      to: "/",
    },
    {
      label: "Resource",
      // to: "/resource",
      children: [
        {
          label: "Project1",
        },
        {
          label: "Project2",
        },
      ],
    },
    {
      label: "Friends",
      to: "/friends",
    },
    {
      label: t("Nav About"),
      to: "/about",
    },
  ];

  return (
    <header className="w-full bg-base-100 shadow-[0_2px_2px_0px_oklch(var(--b3))] z-20">
      <div className="container mx-auto navbar base-100  ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <DropdownIcon className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {menus.map((item, index) => {
                if (item.children) {
                  return (
                    <li key={item.label}>
                      <a>{item.label}</a>
                      <ul className="p-2">
                        {item.children.map((v) => (
                          <li key={v.label}>
                            <a>{v.label}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li key={index}>
                    <a>{item.label}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" href='/'>Elin&apos;s Blog</Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {menus.map((item, index) => {
              if (item.children) {
                return (
                  <li key={item.label}>
                    <details>
                      <summary>{item.label}</summary>
                      <ul className="p-2">
                        {item.children.map((v) => (
                          <li key={v.label}>
                            <a>{v.label}</a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                );
              }
              return (
                <li key={index}>
                  <Link
                    href={item.to!}
                    className={pathname === item.to ? "active" : ""}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-end">
          {mounted && (
            <label className="swap swap-rotate mr-4">
              <input type="checkbox" checked={dark} onChange={onChange} />

              {/* sun icon */}
              <SunIcon className="swap-off h-8 w-8 fill-current" />

              {/* moon icon */}
              <MoonIcon className="swap-on h-8 w-8 fill-current" />
            </label>
          )}

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
                <li key={item.label} onClick={setLang.bind(this, item.value)}>
                  <a className={lang === item.value ? "active" : ""}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default withAffix(Header, { offsetTop: 0.1 });
