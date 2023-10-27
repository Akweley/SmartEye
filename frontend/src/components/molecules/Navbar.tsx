import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { Link as LinkScroll } from "react-scroll";
import { cn } from "@/lib/utils";
import { Button } from "../ui";

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
    <div className="bg-black">
      <div
        className={cn(
          "bg-black/90 flex w-full px-8 lg:px-16 lg:py-2 z-50 transition-all duration-300 ease-in-out",
          scroll ? "fixed top-0 left-0 shadow-lg shadow-yellow-50/5" : ""
        )}
      >
        <div className="md:mx-0 lg:mx-auto lg:px-8 lg:py-2 w-full flex justify-between items-center">
          <Link to="/">
            <span className="font-bold text-white text-3xl hover:text-[#9918b3]  transition-all duration-300 ease-in-out">
              VerifyEd&#8482;
            </span>
          </Link>
          <div className="flex gap-12 items-center text-sm text-white font-bold">
            <Link
              to="/"
              className=" hover:scale-105 hover:text-[#9918b3] transition-all duration-300 ease-in-out"
            >
              Home
            </Link>

            <LinkScroll
              // to={`${location.pathname != "/" ? navigate("/") : "about"}`}
              to="about"
              spy={true}
              smooth={true}
              duration={1000}
              offset={-100}
              className=" hover:scale-105 hover:text-[#9918b3] transition-all duration-300 ease-in-out cursor-pointer"
            >
              About Us
            </LinkScroll>
            <LinkScroll
              // to={`${location.pathname != "/" ? navigate("/") : "about"}`}
              to="pricing"
              spy={true}
              smooth={true}
              duration={1000}
              offset={-100}
              className=" hover:scale-105 hover:text-[#9918b3] transition-all duration-300 ease-in-out cursor-pointer"
            >
              Pricing
            </LinkScroll>
            <LinkScroll
              // to={`${location.pathname != "/" ? navigate("/") : "about"}`}
              to="contact"
              spy={true}
              smooth={true}
              duration={1000}
              offset={-100}
              className=" hover:scale-105 hover:text-[#9918b3] transition-all duration-300 ease-in-out cursor-pointer"
            >
              Contact Us
            </LinkScroll>

            <div className="flex items-center gap-x-4">
              <Button
                variant={"outline"}
                className="text-white bg-transparent border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                onClick={() =>
                  navigate("/auth", {
                    state: { from: { pathname: "/login" } },
                  })
                }
              >
                Login
              </Button>
              <Button
                className="bg-[#9918b3]"
                onClick={() =>
                  navigate("/auth", {
                    state: { from: { pathname: "/signup" } },
                  })
                }
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
