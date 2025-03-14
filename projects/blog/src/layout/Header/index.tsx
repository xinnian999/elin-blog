import { withAffix } from "@/components";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import Nav from "./Nav";
import Search from "./Search";
import classNames from "classnames";

const Header = async () => {
  return (
    <header
      className={classNames("w-full bg-base-top shadow-sm z-50 relative")}
    >
      <div className="container mx-auto navbar base-100">
        <Nav />

        <div className="navbar-end">
          <Search />
          <ThemeSwitcher />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
};

export default withAffix(Header, { offsetTop: 0.1 });
