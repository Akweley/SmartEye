import { Outlet } from "react-router-dom";
// import { NavBar } from "../molecules";
import Footer from "../molecules/Footer";
import { NavBar } from "../molecules";

const RootLayout = () => {
  return (
    <>
      <div className="grid">
        <div className="grid-lines">
          <div className="gradient" />
        </div>
      </div>
      <div className="app">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
