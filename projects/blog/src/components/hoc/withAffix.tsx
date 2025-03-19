"use client";
import React from "react";
import { Affix } from "antd";
import { useScroll } from "ahooks";

interface AffixOptions {
  offsetTop?: number; // 距离顶部的偏移量
  offsetBottom?: number; // 距离底部的偏移量
  target?: () => HTMLElement | Window; // 滚动容器
}

function withAffix<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: AffixOptions // 接收 Affix 配置
) {
  const { offsetTop = 0, target } = options || {};

  const HOC: React.FC<P> = (props) => {
    const scroll = useScroll();

    return (
      <Affix offsetTop={offsetTop} target={target} className="z-50 relative">
        <WrappedComponent {...props} />
      </Affix>
    );
  };

  return HOC;
}

export default withAffix;
