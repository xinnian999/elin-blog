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
  const router = useRouter();

  useUpdateEffect(() => {
    if (pathname.includes("/admin")) {
      checkAuth().catch(() => {
        router.push("/login");
      });
    }
  }, [pathname]);

  if (pathname.includes("/admin") || pathname.includes("/login")) {
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
