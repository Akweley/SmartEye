/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAuth } from "@/context/AuthContext";
import { JsonRpcSigner, ethers } from "ethers";
import { AMLContract, AMLFactory } from "@/contract";
import { useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Label,
  Input,
  CardFooter,
  Button,
} from "@/components/ui";

const LoginDetails = () => {
  const { ethereum } = useAuth();
  const regRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [signer, setSigner] = useState<JsonRpcSigner>();

  const navigate = useNavigate();

  const validateCredentials = async () => {
    let amlContract;

    try {
      amlContract = await AMLContract(address);
      console.log(amlContract);
    } catch (error) {
      console.log(error);
      setError("An error occured. Please submit again.");
      setIsSubmitting(false);
      return;
    }

    let isAdmin;

    try {
      setError("");
      // @ts-ignore
      isAdmin = await amlContract.connect(signer).isAdmin();
      console.log(isAdmin);
    } catch (error) {
      console.log(error);
      setError("Error occured. Submit again");
      setIsSubmitting(false);
    }

    setIsSubmitting(false);

    isAdmin &&
      navigate("/dashboard", {
        state: {
          address: address,
          name: name,
          regNo: regRef.current?.value,
        },
      });

    setError("Only admins have access!");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (ethereum) {
      setError("");
      setIsSubmitting(true);
      const provider = new ethers.BrowserProvider(
        ethereum as ethers.Eip1193Provider
      );
      const signer = await provider.getSigner();
      setSigner(signer);

      const regNo = regRef.current?.value;

      if (regNo) {
        try {
          const [address, name] = await AMLFactory.connect(signer)
            //@ts-ignore
            .getAMLContract(regNo);

          console.log(address);
          console.log(name);
          setAddress(address);
          setName(name);
        } catch (error) {
          console.log(error);
          setError("Invalid registration number");
          setIsSubmitting(false);
        }
      }
      validateCredentials();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full shadow-xl border-none py-5">
        <CardHeader className="text-center mb-6">
          <CardTitle className="mb-3 text-3xl  font-robotoSlab">
            Welcome Back!
          </CardTitle>
          <CardDescription>Enter required details to login.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2 my-2">
              <Label htmlFor="regNo">
                Registration No. <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                id="regNo"
                placeholder="Enter the registration number of the institution"
                ref={regRef}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex  w-full justify-center">
          <Button disabled={isSubmitting} className="px-10 bg-[#9918b3]">
            Login
          </Button>
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
  );
};

export default LoginDetails;
