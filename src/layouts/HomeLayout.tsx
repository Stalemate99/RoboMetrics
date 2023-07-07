import Footer from "../components/Footer";
import Header from "../components/Header";

import { HomeLayoutProps } from "../types/HomeLayout";

function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default HomeLayout;
