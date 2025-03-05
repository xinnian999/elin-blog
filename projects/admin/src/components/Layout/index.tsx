"use client";

import React, { useEffect, useState } from "react";
import {
  BarChartOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
  ArticleIcon,
  LinkIcon,
  CommentIcon,
  TagIcon,
  CategoryIcon,
} from "@elin-blog/icons";
import styles from "./styles.module.scss";
import zhCN from "antd/locale/zh_CN";
import "@ant-design/v5-patch-for-react-19";
import { checkAuth, logout } from "@/auth";

const { Header, Sider, Content } = Layout;

const menus = [
  {
    label: "总览",
    icon: <BarChartOutlined />,
    key: "/",
  },
  {
    label: "文章管理",
    icon: <ArticleIcon />,
    key: "/article",
  },
  {
    label: "分类管理",
    icon: <CategoryIcon />,
    key: "/category",
  },
  {
    label: "标签管理",
    icon: <TagIcon />,
    key: "/tag",
  },
  {
    label: "友情链接管理",
    key: "/link",
    icon: <LinkIcon />,
  },
  {
    label: "留言板管理",
    key: "/comment",
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
    checkAuth().catch(() => {
      router.push("/login");
    });
  }, [pathname]);

  // const goHome = () => {
  //   router.push("/");
  // };

  const isLoginPage = pathname.includes("/login");

  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.container}>
        {isLoginPage ? (
          children
        ) : (
          <Layout className={styles.layout}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div
                className={styles.logo}
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
                className={styles.header}
              >
                <div className={styles.left}>
                  <Button onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </Button>

                  <div className={styles.title}>
                    {menus.find((item) => item.key === pathname)?.label}
                  </div>
                </div>

                <div className={styles.right}>
                  {/* <Button onClick={goHome}>
                    <HomeOutlined />
                  </Button> */}
                  <Button onClick={logout}>
                    <LogoutOutlined />
                  </Button>
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
      </div>
    </ConfigProvider>
  );
};

export default App;
