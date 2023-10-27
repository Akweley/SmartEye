import { signup } from "@/assets";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ThreeDots } from "react-loader-spinner";
import { AMLFactory } from "@/contract";
import { ethers } from "ethers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Label,
  CardFooter,
  Button,
  Input,
} from "@/components/ui";
import { Home } from "lucide-react";

const SignUp = () => {
  const { isAuthenticated, ethereum } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const idRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (ethereum) {
      setError("");
      setIsSubmitting(true);
      const provider = new ethers.BrowserProvider(
        ethereum as ethers.Eip1193Provider,
      );
      const signer = await provider.getSigner();

      const name = nameRef.current?.value;
      const id = idRef.current?.value;

      try {
        await AMLFactory.connect(signer)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          .createAMLContract(name, id);

        setIsSubmitting(false);
        navigate("/login");
      } catch (error) {
        console.log(error);
        setError("Error occured. Try again later");
        setIsSubmitting(false);
      }
    }
  };

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
      <div className="container bg-white relative min-h-screen  items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="donate-bg relative hidden h-full flex-col bg-primary px-20 pt-5 pb-16 text-white dark:border-r lg:flex">
          <div className="h-full items-center flex justify-center">
            <div className="flex items-center xl:py-20 xl:px-8  justify-center xl:shadow-2xl">
              <img
                src={signup}
                alt="signup"
                className="w-[600px] h-[500px] -mr-20"
              />
            </div>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[450px]">
            <Link to="/" className="drop-shadow-xl bg-primary p-6 rounded-full">
              <Home className="w-16 h-16 text-white " />
            </Link>
            <form onSubmit={handleSubmit} className="w-full">
              <Card className="w-full shadow-xl border-none py-5">
                <CardHeader className="text-center mb-6">
                  <CardTitle className="mb-3 text-3xl font-robotoSlab">
                    Sign Up
                  </CardTitle>
                  <CardDescription>
                    Signing up to SmartEye is very easy.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-2 my-2">
                      <Label htmlFor="name">
                        Institution Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        id="name"
                        placeholder="Enter the name of the institution"
                        ref={nameRef}
                      />
                    </div>
                  </div>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-2 my-2">
                      <Label htmlFor="id">
                        Registration Number{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        id="id"
                        placeholder="Enter the registration No. of the institution"
                        ref={idRef}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col w-full gap-3 justify-center">
                  <Button disabled={isSubmitting} className="px-10 bg-primary">
                    Sign Up
                  </Button>
                  <p className="text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary hover:text-primary-dark"
                    >
                      Login
                    </Link>
                  </p>
                </CardFooter>
                <div className="flex flex-col text-sm mb-5">
                  {isSubmitting && (
                    <div className="flex w-full justify-center">
                      <ThreeDots
                        height="40"
                        width="40"
                        radius="9"
                        color="black"
                        ariaLabel="three-dots-loading"
                        visible={true}
                      />
                    </div>
                  )}
                  {error && <p className="text-center text-red-500">{error}</p>}
                </div>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
