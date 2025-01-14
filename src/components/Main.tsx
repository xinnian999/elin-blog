"use client";

import { FC, ReactNode } from "react";
import Card from "./Card";
import { BliIcon, EmailIcon, GitHubIcon, QQIcon, WechatIcon } from "./Icon";
import { useT } from "@/hooks";
import Image from "next/image";

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
            <div className="w-24 rounded-full overflow-hidden relative">
              <Image src="/auther_avatar.webp" alt={""} fill />
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
