import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";

const Header = () => {
  return (
    <div className="bg-black">
      <div className={cn("glassmorph flex w-full px-8 py-2 lg:px-16 z-50 ")}>
        <div className="md:mx-0 lg:mx-auto lg:px-8 py-2 w-full flex justify-between items-center">
          <Link to="/">
            <span className="font-bold text-white text-3xl hover:text-[#f59e0b]  transition-all duration-300 ease-in-out">
              SmartEye&#8482;
            </span>
          </Link>
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
