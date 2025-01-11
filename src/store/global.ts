import { Lang } from "@/interface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GlobalStore {
  dark: boolean;
  lang: Lang;
  setDark: (val: boolean) => void;
  setLang: (val: Lang) => void;
}

const useGlobalStore = create(
  persist<GlobalStore>(
    (set) => ({
      dark: false,
      lang: "zh",
      setDark: (val) => set({ dark: val }),
      setLang: (val) => set({ lang: val }),
    }),
    {
      name: "global", // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useGlobalStore;
