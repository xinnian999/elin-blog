"use client";
// import { useScroll, useSize } from "ahooks";
import { Affix as AntdAffix } from "antd";
import classNames from "classnames";

export default function Affix({
  children,
  top = 0,
  className,
}: {
  children: React.ReactNode;
  top?: number;
  className?: string;
}) {
//   const scroll = useScroll();

//   const size = useSize(() => document.body);

//   const result =
//     size && scroll && size.height - scroll.top - window.innerHeight;

//   const offsetTop = result && result > 100 ? top : 0;

  return (
    <AntdAffix
      offsetTop={top}
      className={classNames("z-50 relative", className)}
    >
      {children}
    </AntdAffix>
  );
}
