import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { login } from "@/assets";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import LoginDetails from "./LoginDetails";

const LoginPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  let currentUser = "";

  if (params.user) {
    currentUser = params.user.slice(0, 1).toUpperCase() + params.user.slice(1);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth", {
        state: { from: location },
      });
    }
  }, [isAuthenticated]);
  return (
    <div>
      <div className="container bg-white relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="donate-bg relative hidden h-full flex-col bg-[#661477] px-20 pt-5 pb-16 text-white dark:border-r lg:flex">
          <Link to="/">
            <span className="font-bold text-white text-3xl">
              VerifyEd&#8482;
            </span>
          </Link>

          <div className="h-full items-center flex justify-center mt-5">
            <div className="flex items-center p-20 justify-center shadow-2xl">
              <img src={login} alt="login" className="w-[600px] h-[500px]" />
            </div>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col mb-3">
              <LoginDetails user={currentUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
