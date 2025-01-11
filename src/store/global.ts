import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GlobalStore {
  dark: boolean;
  setDark: (val: boolean) => void;
}

const useGlobalStore = create(
  persist<GlobalStore>(
    (set) => ({
      dark: false,
      setDark: (val) => set({ dark: val }),
    }),
    {
      name: "global", // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useGlobalStore;
