import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col items-center w-full px-8 lg:px-16 py-12 ">
      <div className="md:mx-0 lg:mx-auto lg:px-8  w-full flex justify-center items-center">
        <p className="text-black text-base mt-10 flex items-center flex-nowrap gap-x-3 ">
          <span className="font-bold">
            <Link to="/" className="text-4xl text-black">
              SmartEye&#8482;
            </Link>
          </span>{" "}
          &copy; 2023 All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
