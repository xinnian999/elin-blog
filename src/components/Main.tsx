"use client";

import { FC, ReactNode } from "react";
import Card from "./Card";
import { BliIcon, EmailIcon, GitHubIcon, QQIcon, WechatIcon } from "./Icon";
import { useT } from "@/hooks";

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  const t = useT();

  const links = [
    {
      label: "微信",
      icon: <WechatIcon className="h-6 w-6 fill-current" />,
      onClick: () => {},
    },
    {
      label: "QQ",
      icon: <QQIcon className="h-6 w-6 fill-current" />,
      onClick: () => {},
    },
    {
      label: "邮箱",
      icon: <EmailIcon className="h-6 w-6 fill-current" />,
      onClick: () => {},
    },
    {
      label: "B站",
      icon: <BliIcon className="h-6 w-6 fill-current" />,
      onClick: () => {},
    },
  ];

  return (
    <main className="container mx-auto min-h-screen py-8 flex gap-6">
      <div className="basis-1/4 flex-grow">
        <Card className="flex flex-col items-center gap-4">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src="https://img1.baidu.com/it/u=728383910,3448060628&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1736960400&t=c34e985c283711476609906f70947a5b" />
            </div>
          </div>

          <div className="font-bold text-xl">{t("Auther Say")}</div>

          <div>
            <button className="btn btn-primary btn-wide btn-sm">
              <GitHubIcon className="h-5 w-5 fill-current" /> GitHub
            </button>
          </div>

          <div className="flex gap-2">
            {links.map((item) => (
              <button className="btn btn-ghost" key={item.label}>
                {item.icon}
              </button>
            ))}
          </div>
        </Card>
      </div>
      <div className="basis-3/4 flex-grow"> {children}</div>
    </main>
  );
};

export default Main;
