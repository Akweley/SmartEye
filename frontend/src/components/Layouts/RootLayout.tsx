import { Outlet } from "react-router-dom";
import { NavBar } from "../molecules";
import Footer from "../molecules/Footer";

const RootLayout = () => {
  return (
    <div className="grid">
      <div className="grid-lines">
          <div className="gradient" />
        </div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
