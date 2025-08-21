import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import BackTop from "./BackTop";
import Message from "./Message";
import Background from "./Background";
import ErrorBoundary from "./ErrorBoundary";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <BackTop />
      <Message />
      <Background />
    </ErrorBoundary>
  );
};

export default Layout;
