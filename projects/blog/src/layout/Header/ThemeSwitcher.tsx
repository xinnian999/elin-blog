"use client";
import { setTheme } from "@/async";
import { SunIcon, MoonIcon } from "@/icons";
import { useTheme } from "@/hooks";

const ThemeSwitcher = () => {
  const theme = useTheme();

  const onChange = (e: { target: { checked: boolean } }): void => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <>
      <button className="btn btn-ghost btn-xs sm:btn-sm md:btn-md">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={onChange}
          />

          {/* sun icon */}
          <SunIcon className="swap-off h-8 w-8 fill-current" />

          {/* moon icon */}
          <MoonIcon className="swap-on h-8 w-8 fill-current" />
        </label>
      </button>
    </>
  );
};

export default ThemeSwitcher;
