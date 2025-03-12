/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Card } from "@/components";
import { useScroll } from "ahooks";
import classNames from "classnames";
import { useEffect, useState } from "react";

interface Heading {
  level: string;
  title: string;
  key: string;
}

function Anchor({ headings }: { headings: Heading[] }) {
  const scroll = useScroll();

  const [currentKey, setCurrentKey] = useState<string>();

  const handleScroll = (title: string) => {
    const target = document.getElementById(title)!;
    window.scrollTo({
      top: target?.offsetTop - 100,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!scroll) return;

    // 高亮当前锚点
    const headingEls = headings.map((item) => ({
      ...item,
      el: document.getElementById(item.title),
    }));

    const lastEl = headingEls.find(
      (item) => item.el && item.el.offsetTop > scroll.top
    );

    setCurrentKey(lastEl?.key);

    // 滚动到高亮锚点
    const element = document.querySelector(".anchor-item.bg-primary");

    element?.scrollIntoView({
      behavior: "smooth", // 平滑滚动
      block: "center", // 使元素滚动到视口顶部
    });
  }, [scroll]);

  return (
    <Card className="">
      <p className="text-xs mb-3">目录</p>

      <div className="flex flex-col gap-1 max-h-[30vh] overflow-auto">
        {headings.map((item) => {
          return (
            <div
              key={item.title}
              className={classNames("anchor-item", {
                "p-2 rounded-lg  cursor-pointer text-[14px] hover:bg-base-300":
                  item.level === "h2",
                "pl-5 py-1 rounded-lg text-gray-500 text-[12px] cursor-pointer hover:bg-base-300":
                  item.level === "h3",
                "bg-primary text-primary-content hover:bg-primary":
                  currentKey === item.key,
              })}
              onClick={() => handleScroll(item.title)}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default Anchor;
