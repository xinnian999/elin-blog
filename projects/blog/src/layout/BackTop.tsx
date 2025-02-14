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
      <FloatButton.BackTop className="bg-base-100" />
    </ConfigProvider>
  );
}

export default BackTop;
