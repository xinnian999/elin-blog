"use client";
import { FC } from "react";
import { Card } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { BackendIcon, BliIcon, EmailIcon, QQIcon, WechatIcon } from "@/icons";
import { Sticky } from "@/components";
import { useT } from "@/hooks";

interface Props {
  summary: Record<string, any>;
  archives: any[];
}

const LeftBar: FC<Props> = ({ summary, archives }) => {
  const t = useT();

  const pathname = usePathname();

  const links = [
    {
      label: <Image src="/wechat.jpg" alt="微信" width={180} height={180} />,
      icon: <WechatIcon className="h-6 w-6 fill-current" />,
      link: "",
    },
    {
      label: "QQ",
      icon: <QQIcon className="h-6 w-6 fill-current" />,
      link: "https://qm.qq.com/q/Si0egMv7sk",
    },
    {
      label: "邮箱",
      icon: <EmailIcon className="h-6 w-6 fill-current" />,
      link: "mailto:3307578337@qq.com",
    },
    {
      label: "B站",
      icon: <BliIcon className="h-6 w-6 fill-current" />,
      link: "https://space.bilibili.com/428595129",
    },
  ];

  const counts = [
    {
      label: t("Article Count Label"),
      count: summary?.articleCount,
      href: "/",
    },
    {
      label: t("Category Count Label"),
      count: summary?.categoryCount,
      href: "/categories",
    },
    {
      label: t("Tag Count Label"),
      count: summary?.tagCount,
      href: "/tags",
    },
  ];

  const handleGoAdmin = () => {
    // console.log(process.env.NODE_ENV);
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) {
      window.open(`http://${window.location.hostname}:3001/admin/`);
    } else {
      window.open(`${window.location.origin}/admin`);
    }
  };

  return (
    <div
      className={classNames("left-bar", "h-full", {
        "flex flex-col": true,
        "hidden lg:flex flex-col": pathname !== "/",
      })}
    >
      <Card className="mb-5" key="1">
        <div className="flex flex-col items-center gap-4">
          <div className="avatar">
            <div className="w-24 rounded-full overflow-hidden relative">
              <Image src="/auther_avatar.webp" alt={""} fill />
            </div>
          </div>

          <div className="font-bold text-xl">{t("Auther Say")}</div>

          <div className="w-full text-center">
            <button
              className="btn bg-primary btn-block text-white max-w-[300px]"
              onClick={() => window.open("https://github.com/xinnian999")}
            >
              <svg
                aria-label="GitHub logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                ></path>
              </svg>
              GitHub
            </button>
          </div>

          <div className="flex gap-2">
            {links.map((item) => {
              return (
                <div className="tooltip" key={item.link}>
                  <div className="tooltip-content">{item.label}</div>
                  <Link href={item.link} target="_blank">
                    <button className="btn btn-ghost">{item.icon}</button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      <Sticky top={80} bottomBoundary=".left-bar">
        <div>
          <Card key="2">
            <div className="flex flex-col gap-4">
              <div className="flex gap-5 justify-center">
                {counts.map((item) => (
                  <div
                    className="flex flex-col gap-2 flex-nowrap h-16 text-center"
                    key={item.label}
                  >
                    <div> {item.label}</div>
                    <Link href={item.href}>
                      <button className="btn btn-ghost">
                        <div className="text-[25px]"> {item.count}</div>
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="w-full text-center">
                <button
                  className="btn bg-primary btn-block text-white max-w-[300px]"
                  onClick={handleGoAdmin}
                >
                  <BackendIcon className="h-5 w-5 fill-current" />{" "}
                  {t("Admin Label")}
                </button>
              </div>
            </div>
          </Card>

          <Card className="mt-5" key="3">
            <p className="text-xs mb-1">归档</p>
            <div className="flex flex-col items-center">
              {archives.map((item) => (
                <div
                  key={item.year}
                  className="text-[14px] mt-2 w-full flex justify-between relative items-center p-2 cursor-pointer rounded hover:bg-base-200"
                >
                  <span className="ml-2">{item.year}</span>{" "}
                  <span className="bg-base-200 px-3 rounded">
                    {item.article_count}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Sticky>
    </div>
  );
};

export default LeftBar;
