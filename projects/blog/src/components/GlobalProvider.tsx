"use client";

import { defaultLang } from "@/i18n";
import { createContext } from "react";

type GlobalContextType = {
  theme: Theme;
  lang: Lang;
};

export const GlobalContext = createContext<GlobalContextType>({
  theme: "light",
  lang: defaultLang,
});

function GlobalProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: GlobalContextType;
}) {
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalProvider;
