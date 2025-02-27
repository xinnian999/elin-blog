"use client";

import { SunIcon, MoonIcon } from "@/components/Icon";
import { useTheme } from "@/hooks";

const ThemeSwitcher = ({ initialTheme }: { initialTheme: Theme }) => {
  const onChange = (e: { target: { checked: boolean } }): void => {
    useTheme.setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <>
      <button className="btn btn-ghost">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            checked={initialTheme === "dark"}
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
