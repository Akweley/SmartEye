import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

// import { Link as LinkScroll } from "react-scroll";
import { cn } from "@/lib/utils";
import { Button } from "../ui";

// const navItems = [
//   {
//     name: "Partners",
//     href: "/partners",
//   },
//   {
//     name: "About Us",
//     href: "/about",
//   },
//   {
//     name: "Services",
//     href: "/services",
//   },
//   {
//     name: "FAQs",
//     href: "/faqs",
//   },
// ];

const NavBar = () => {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  // const location = useLocation();

  useEffect(() => {
    const scrollListener = () => {
      setScroll(window.scrollY > 20);
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);
  return (
    <div
      className={cn(
        "top-0 z-[99999] w-full transition-colors duration-500 ease-in-out",
        scroll ? "bg-white fixed top-0 shadow-lg" : "bg-transparent",
      )}
    >
      <nav
        className={cn(
          "container mx-auto flex items-center justify-between px-7 transition-all duration-300 ease-in-out",
          scroll ? "py-4" : "py-8",
        )}
      >
        <Link className="text-3xl font-black tracking-wider" to="/">
          SmartEyes
        </Link>

        {/* <ul className="hidden flex-row items-center gap-8 lg:flex">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className="desc font-medium tracking-widest transition-all duration-500 ease-in-out hover:text-primary"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul> */}

        <div className="flex items-center gap-x-6">
          <Button
            className="tracking-widest uppercase text-sm hidden lg:block"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            className="tracking-widest uppercase text-sm hidden lg:block bg-transparent text-primary border border-primary"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
