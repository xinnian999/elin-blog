import { GlobalContext } from "@/components";
import { useContext } from "react";

const useLang = () => {
  const { lang } = useContext(GlobalContext);

  return lang;
};

export default useLang;
