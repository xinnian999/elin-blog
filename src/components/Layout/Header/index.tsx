"use client"

import { withAffix } from "@/components";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="w-full bg-base-100 shadow-[0_2px_2px_0px_oklch(var(--b3))] z-20">
      <div className="container mx-auto navbar base-100  ">
        <Nav />

        <div className="navbar-end">
          <ThemeSwitcher />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
};

export default withAffix(Header, { offsetTop: 0.1 });
