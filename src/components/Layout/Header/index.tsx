import { Affix } from "@/components";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import Nav from "./Nav";
import Search from "./Search";
import classNames from "classnames";

const Header = async () => {
  return (
    <Affix>
      <header className={classNames("w-full bg-base-top shadow z-40 relative")}>
        <div className="container mx-auto navbar base-100">
          <Nav />

          <div className="navbar-end">
            <Search />
            <ThemeSwitcher />
            <LocaleSwitcher />
          </div>
        </div>
      </header>
    </Affix>
  );
};

export default Header;
