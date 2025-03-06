import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import BackTop from "./BackTop";
import Message from "./Message";
import Background from "./Background";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <BackTop />
      <Message />
      <Background/>
    </>
  );
};

export default Layout;
