import { locales } from "@/config";
import useGlobalStore from "@/store/global";

const useT = () => {
  const lang = useGlobalStore((state) => state.lang);

  const locale = locales.find((item) => item.value === lang)!;

  const t = (key: string) => {
    return locale.data[key];
  };

  return t;
};

export default useT;
