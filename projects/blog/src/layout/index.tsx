import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import BackTop from "./BackTop";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <BackTop />
    </>
  );
};

export default Layout;
