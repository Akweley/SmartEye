import { ReactNode } from "react";
import Header from "./Header";


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen md:mx-0 lg:mx-auto lg:px-20 lg:pb-8 w-full px-8 py-10">
        {children}
      </div>
    </>
  );
};

export default Layout;
