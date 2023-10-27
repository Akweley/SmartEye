import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginDetails from "./LoginDetails";
import { login } from "@/assets";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { Home } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth", {
        state: { from: location },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return (
    <div>
      <div className="container bg-white relative min-h-screen items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="donate-bg relative hidden h-full flex-col bg-primary px-20 pt-5 pb-16 text-white dark:border-r lg:flex">
          <div className="h-full items-center flex justify-center mt-5">
            <div className="flex items-center xl:p-20 justify-center xl:shadow-2xl">
              <img src={login} alt="login" className="w-[600px] h-[500px]" />
            </div>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[450px]">
            <Link to="/" className="drop-shadow-xl bg-primary p-6 rounded-full">
              <Home className="w-16 h-16 text-white " />
            </Link>
            <div className="flex flex-col w-full mb-3">
              <LoginDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
