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

const SignUp = () => {
  const { isAuthenticated, ethereum } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schoolRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (ethereum) {
      setError("");
      setIsSubmitting(true);
      const provider = new ethers.BrowserProvider(
        ethereum as ethers.Eip1193Provider
      );
      const signer = await provider.getSigner();

      const schoolID = schoolRef.current?.value;
      const schoolName = nameRef.current?.value;

      try {
        await AMLFactory.connect(signer)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          .createVerifyEdContract(BigInt(schoolID), schoolName);

        setIsSubmitting(false);
        navigate("/login/admin");
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
  }, [isAuthenticated]);
  return (
    <div>
      <div className="container bg-white relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="donate-bg relative hidden h-full flex-col bg-[#661477] px-10 pt-5 pb-10 text-white dark:border-r lg:flex">
          <Link to="/">
            <span className="font-bold text-white text-3xl">
              VerifyEd&#8482;
            </span>
          </Link>

          <div className="h-full items-center flex justify-center">
            <div className="flex items-center p-20 justify-center shadow-2xl">
              <img src={signup} alt="signup" className="w-[500px] h-[500px]" />
            </div>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <form onSubmit={handleSubmit}>
              <Card className="w-full shadow-lg border-none py-5">
                <CardHeader>
                  <CardTitle className="mb-3 text-3xl font-robotoSlab">
                    Sign Up
                  </CardTitle>
                  <CardDescription>
                    Signing up to verifyEd is very easy.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-2 my-2">
                      <Label htmlFor="schoolId">
                        School ID <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        id="schoolID"
                        placeholder="Enter the ID of the school"
                        ref={schoolRef}
                      />
                    </div>
                  </div>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-2 my-2">
                      <Label htmlFor="schoolName">
                        School Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        id="schoolName"
                        placeholder="Enter the name of the school"
                        ref={nameRef}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col w-full gap-3 justify-center">
                  <Button
                    disabled={isSubmitting}
                    className="px-10 bg-[#9918b3]"
                  >
                    Sign Up
                  </Button>
                  <p className="text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-[#9918b3] hover:text[#c22ce0]"
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
                        color="#f620e5"
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
