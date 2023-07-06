import Footer from "../components/Footer";
import Header from "../components/Header";

import { HomeLayoutProps } from "../types/HomeLayout";

function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default HomeLayout;
