"use client";

import { usePathname, useRouter } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { useUpdateEffect } from "ahooks";
import { checkAuth } from "@/db/service/auth";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();


  if (pathname.includes("/admin")) {
    return children;
  }

  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
