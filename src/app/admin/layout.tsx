"use client";

import React, { useEffect, useState } from "react";
import {
  BarChartOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
  ArticleIcon,
  LinkIcon,
  CommentIcon,
  TagIcon,
  CategoryIcon,
} from "@/components";
import styles from "./styles.module.css";
import zhCN from "antd/locale/zh_CN";
import "@ant-design/v5-patch-for-react-19";
import { checkAuth, logout } from "@/db/service/auth";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { useUpdateEffect } from "ahooks";

const { Header, Sider, Content } = Layout;

const menus = [
  {
    label: "总览",
    icon: <BarChartOutlined />,
    key: "/admin",
  },
  {
    label: "文章管理",
    icon: <ArticleIcon />,
    key: "/admin/article",
  },
  {
    label: "分类管理",
    icon: <CategoryIcon />,
    key: "/admin/category",
  },
  {
    label: "标签管理",
    icon: <TagIcon />,
    key: "/admin/tag",
  },
  {
    label: "友情链接管理",
    key: "/admin/link",
    icon: <LinkIcon />,
  },
  {
    label: "留言板管理",
    key: "/admin/comment",
    icon: <CommentIcon />,
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

const App: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  const pathname = usePathname();
  
  useEffect(() => {
    if (pathname.includes("/admin")) {
      checkAuth().catch(() => {
        router.push("/admin/login");
      });
    }
  }, [pathname]);

  const goHome = () => {
    router.push("/");
  };

  const isLoginPage = pathname.includes("/login");

  return (
    <ConfigProvider locale={zhCN}>
      <AntdRegistry>
        {isLoginPage ? (
          children
        ) : (
          <Layout className="h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div
                className={styles.adminLayout}
                style={{ backgroundColor: "rgba(255, 255, 255, .2)" }}
              >
                {collapsed ? "Elin" : "Elin's Blog 后台"}
              </div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[pathname]}
                items={menus}
                onSelect={(item: { key: string }) => router.push(item.key)}
              />
            </Sider>
            <Layout>
              <Header
                style={{ background: colorBgContainer, padding: "0 24px" }}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <button
                    className="btn btn-ghost"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </button>

                  <div className="text-2xl">
                    {menus.find((item) => item.key === pathname)?.label}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="btn btn-ghost" onClick={goHome}>
                    <HomeOutlined />
                  </button>
                  <button className="btn btn-ghost" onClick={logout}>
                    <LogoutOutlined />
                  </button>
                </div>
              </Header>
              <Content
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        )}
      </AntdRegistry>
    </ConfigProvider>
  );
};

export default App;
