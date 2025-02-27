import { withAffix } from "@/components";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import Nav from "./Nav";
import { getTheme } from "@/async";
import Search from "./Search";

const Header = async () => {
  const theme = await getTheme(); // 获取服务端主题

  return (
    <header className="w-full bg-base-100 shadow-[0_2px_2px_0px_oklch(var(--b3))] z-20">
      <div className="container mx-auto navbar base-100  ">
        <Nav />

        <div className="navbar-end">
          <Search/>
          <ThemeSwitcher initialTheme={theme} />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
};

export default withAffix(Header, { offsetTop: 0.1 });
