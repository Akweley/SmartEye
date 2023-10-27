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
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    savings: 0,
    current: 0,
    student: 0,
    business: 0,
    referral: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(e: any) {
    e.preventDefault();
    localStorage.setItem("isOnboarded", "true");
    navigate("/dashboard");
  }

  return (
    <div className="mx-auto w-full lg:w-2/4">
      <form onSubmit={handleSubmit} className="w-full mt-10">
        <Card className="w-full">
          <CardHeader className="font-bold">
            Onboarding
            <CardDescription>Fill in details below</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <div className="flex flex-col space-y-1.5">
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
            <div className="flex flex-col space-y-1.5">
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
            <div className="flex flex-col space-y-1.5">
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
            <div className="flex flex-col space-y-1.5">
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

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="referral">How did you hear about us?</Label>
              <Select
                required
                onValueChange={(value) => {
                  setData({ ...data, referral: value });
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
          <CardFooter>
            <Button className="">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Onboarding;
