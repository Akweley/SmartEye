import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
const Footer = () => {
  return (
    <div className="flex flex-col items-center w-full px-8 lg:px-16 py-12 glassmorph">
      <div className="md:mx-0 lg:mx-auto lg:px-8  w-full flex justify-center items-center">
        <p className="text-white text-base mt-10 flex items-center flex-nowrap gap-x-3">
         
          <span className="font-bold">
            <Link to="/">
              <img src={logo} alt="logo" className="w-32" />
            </Link>
          </span>{" "}
          &copy; 2023{" "}
          All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
