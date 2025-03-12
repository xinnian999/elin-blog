"use client";
import { withAffix } from "@/components";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import Nav from "./Nav";
import Search from "./Search";
import { useTheme } from "@/hooks";
import classNames from "classnames";
import { useScroll } from "ahooks";

const Header = () => {
  const theme = useTheme(); // 获取服务端主题

  const scroll = useScroll();

  return (
    <header
      className={classNames("w-full bg-base shadow-sm z-50 relative", {
        "bg-base-top": scroll?.top > 50,
      })}
    >
      <div className="container mx-auto navbar base-100">
        <Nav />

        <div className="navbar-end">
          <Search />
          <ThemeSwitcher initialTheme={theme} />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
};

export default withAffix(Header, { offsetTop: 0.1 });
