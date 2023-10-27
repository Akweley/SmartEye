/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  CardFooter,
  Button,
} from "@/components/ui";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useQueryContract from "./dashboard/hooks/useQueryContract";
import { ethers } from "ethers";
import { useAuth } from "@/context/AuthContext";
import { ThreeDots } from "react-loader-spinner";

const Onboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [referral, setReferral] = useState("");
  const { contract } = useQueryContract(location.state.address);
  const { ethereum } = useAuth();
  const [data, setData] = useState({
    savings: 0,
    current: 0,
    student: 0,
    business: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(referral);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsSubmitting(true);

    if (ethereum) {
      const provider = new ethers.BrowserProvider(
        ethereum as ethers.Eip1193Provider,
      );
      const signer = await provider.getSigner();
      const accountTypes = Object.entries(data);

      if (contract) {
        try {
          {
            await contract
              .connect(signer)
              //@ts-ignore
              .setAccountTypeLimit(
                accountTypes[0][0],
                BigInt(accountTypes[0][1]),
              );
          }
        } catch (err) {
          console.log(err);
          setIsSubmitting(false);
        }
      }
    }
    localStorage.setItem("isOnboarded", "true");

    navigate("/dashboard", {
      state: {
        address: location.state.address,
        name: location.state.name,
        regNo: location.state.regNo,
      },
    });
  }

  return (
    <div className="mx-auto w-full lg:w-2/4">
      <form onSubmit={handleSubmit} className="w-full mt-10">
        <Card className="w-full">
          <CardHeader className="font-bold text-4xl text-center mt-5 mb-8">
            Onboarding
            <CardDescription>Fill in details below</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex flex-col space-y-2.5">
              <Label>Account Limit - Savings (GHS)</Label>
              <Input
                placeholder="Enter account limit"
                type="number"
                required
                min={0}
                onChange={(e) => {
                  setData({ ...data, savings: parseInt(e.target.value) });
                }}
              />
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label>Account Limit - Current (GHS)</Label>
              <Input
                placeholder="Enter account limit"
                type="number"
                required
                min={0}
                onChange={(e) => {
                  setData({ ...data, current: parseInt(e.target.value) });
                }}
              />
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label>Account Limit - Bussiness (GHS)</Label>
              <Input
                placeholder="Enter account limit"
                type="number"
                required
                min={0}
                onChange={(e) => {
                  setData({ ...data, business: parseInt(e.target.value) });
                }}
              />
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label>Account Limit - Student (GHS)</Label>
              <Input
                placeholder="Enter account limit"
                type="number"
                required
                min={0}
                onChange={(e) => {
                  setData({ ...data, student: parseInt(e.target.value) });
                }}
              />
            </div>

            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="referral">How did you hear about us?</Label>
              <Select
                required
                onValueChange={(value) => {
                  setReferral(value);
                }}
              >
                <SelectTrigger id="referral">
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="youtube">Youtube</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="w-full flex items-center flex-col">
            <Button className="w-4/5">Submit</Button>
            <div className="flex flex-col text-sm mb-5">
              {isSubmitting && (
                <div className="flex w-full justify-center">
                  <ThreeDots
                    height="40"
                    width="40"
                    radius="9"
                    color="#221621"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Onboarding;
