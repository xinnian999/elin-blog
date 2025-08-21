import useLang from "./useLang";
import { translations } from "@/i18n";

const useT = () => {
  const lang = useLang();

  const t = (key: string) => {
    return translations[lang][key];
  };

  return t;
};

export default useT;
