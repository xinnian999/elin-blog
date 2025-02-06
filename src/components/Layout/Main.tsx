"use client";

import { FC, ReactNode } from "react";
import {
  BliIcon,
  EmailIcon,
  GitHubIcon,
  QQIcon,
  WechatIcon,
  Card,
  BackendIcon,
} from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRequest } from "ahooks";
import { fetchSummary } from "@/db/service/all";

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  const t = useTranslations("Main");

  const router = useRouter();

  const { data } = useRequest(fetchSummary);

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

  const counts = [
    {
      label: t("Article Count Label"),
      count: data?.articleCount,
      onClick: () => {},
    },
    {
      label: t("Category Count Label"),
      count: data?.categoryCount,
      onClick: () => {},
    },
    {
      label: t("Tag Count Label"),
      count: data?.tagCount,
      onClick: () => {},
    },
  ];

  return (
    <main className="container mx-auto min-h-screen py-8 flex gap-6">
      <div className="basis-1/4 flex-grow flex flex-col gap-5">
        <Card>
          <div className="flex flex-col items-center gap-4">
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
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {counts.map((item) => (
                <button
                  className="btn btn-ghost flex flex-col gap-4 flex-nowrap h-16"
                  key={item.label}
                >
                  <div> {item.label}</div>
                  <div className="text-[25px]"> {item.count}</div>
                </button>
              ))}
            </div>
            <div>
              <button
                className="btn btn-primary btn-wide btn-sm"
                onClick={() => router.push("/admin")}
              >
                <BackendIcon className="h-5 w-5 fill-current" />{" "}
                {t("Admin Label")}
              </button>
            </div>
          </div>
        </Card>
      </div>
      <div className="basis-3/4 flex-grow overflow-hidden"> {children} </div>
    </main>
  );
};

export default Main;
