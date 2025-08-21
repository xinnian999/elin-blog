import { GlobalContext } from "@/components";
import { useContext } from "react";

const useTheme = () => {
  const { theme } = useContext(GlobalContext);

  return theme;
};

export default useTheme;
