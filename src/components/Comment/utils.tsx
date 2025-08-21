import { AndroidIcon, MacIcon, WindowsIcon } from "@/icons";

export const getOsIcon = (os: string) => {
  if (os.includes("mac")) {
    return <MacIcon className="w-4 h-4" />;
  }

  if (os.includes("Android")) {
    return <AndroidIcon className="w-4 h-4" />;
  }

  return <WindowsIcon className="w-4 h-4" />;
};
