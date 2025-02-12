"use client";

import { SunIcon, MoonIcon } from "@/components/Icon";
import { useMounted, useTheme } from "@/hooks";
import { useEffect } from "react";

const ThemeSwitcher = () => {
  const theme = useTheme();

  const mounted = useMounted();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const onChange = (e: { target: { checked: boolean } }): void => {
    useTheme.setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <>
      {mounted && (
        <label className="swap swap-rotate mr-4">
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
      )}
    </>
  );
};

export default ThemeSwitcher;
