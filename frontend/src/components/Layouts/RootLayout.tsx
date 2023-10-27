import { Outlet } from "react-router-dom";

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
      </div>
    </>
  );
};

export default RootLayout;
