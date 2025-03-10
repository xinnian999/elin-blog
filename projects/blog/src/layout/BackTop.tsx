"use client";
import { ConfigProvider, FloatButton } from "antd";

function BackTop() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: "transparent",
          colorText:'inherit'
        },
      }}
    >
      <FloatButton.BackTop className="bg-base" />
    </ConfigProvider>
  );
}

export default BackTop;
