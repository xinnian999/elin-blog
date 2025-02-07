"use client"

import { SunIcon, MoonIcon } from "@/components/Icon";
import { useMounted } from "@/hooks";
import useGlobalStore from "@/store/global";
import { useEffect } from "react";

const ThemeSwitcher = () => {
  const dark = useGlobalStore((state) => state.dark);
  const setDark = useGlobalStore((state) => state.setDark);

  const mounted = useMounted();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  const onChange = (e: { target: { checked: boolean } }): void => {
    setDark(e.target.checked);
  };

  return (
    <>
      {mounted && (
        <label className="swap swap-rotate mr-4">
          <input type="checkbox" checked={dark} onChange={onChange} />

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
