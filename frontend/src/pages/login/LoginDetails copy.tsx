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

const LoginDetails = ({ user }: { user: string }) => {
  const { ethereum } = useAuth();
  const schoolRef = useRef<HTMLInputElement | null>(null);
  const studentRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const pubKeyRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [schoolAddress, setSchoolAddress] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [signer, setSigner] = useState<JsonRpcSigner>();

  const navigate = useNavigate();

  const validateCredentials = async () => {
    // const schoolID = schoolRef.current?.value;
    // const studentID = studentRef.current?.value;
    const address = addressRef.current?.value;
    const pubKey = pubKeyRef.current?.value;
    let verifyEdContract;

    try {
      verifyEdContract = await AMLContract(schoolAddress);
    } catch (error) {
      console.log(error);
      setError("An error occured. Submit again");
      setIsSubmitting(false);
      return;
    }

    if (user == "Admin") {
      setError("");
      let isAdmin;
      let totalStudents;

      try {
        // @ts-ignore
        isAdmin = await verifyEdContract.connect(signer).isAdmin();

        // console.log(isAdmin);
      } catch (error) {
        console.log(error);
        setError("Error occured. Submit again");
        setIsSubmitting(false);
      }

      try {
        totalStudents = await verifyEdContract
          //@ts-ignore
          .connect(signer)
          //@ts-ignore
          .getStudentCount();
        console.log(totalStudents);
      } catch (error) {
        console.log(error);
      }

      setIsSubmitting(false);

      isAdmin &&
        navigate("/admin", {
          state: {
            address: schoolAddress,
            name: schoolName,
            id: schoolRef.current?.value,
            totalStudents: Number(totalStudents),
          },
        });

      setError("Only admins have access!");
    }

    if (user == "Student") {
      setError("");
      let isStudent;
      let id;
      let _name;
      let programme;
      let yearOfCompletion;
      let hash;

      try {
        //pass in studentid when change is made
        // @ts-ignore
        isStudent = await verifyEdContract.connect(signer).isStudent();
        console.log(isStudent);
        if (isStudent) {
          [id, _name, programme, yearOfCompletion, hash] =
            await verifyEdContract
              // @ts-ignore
              .connect(signer)
              // @ts-ignore
              .getStudentDetails(signer?.address);

          console.log(id);
          console.log(_name);
        }
      } catch (error) {
        console.log(error);
        setError("Error occured. Submit again");
        setIsSubmitting(false);
      }

      setIsSubmitting(false);

      isStudent &&
        navigate("/student", {
          state: {
            address: schoolAddress,
            details: { id, _name, programme, yearOfCompletion, hash },
          },
        });

      setError("Only registered students have access!");
    }

    if (user == "Guest") {
      setError("");
      let isApproved;
      let id;
      let _name;
      let programme;
      let yearOfCompletion;
      let hash;

      try {
        // @ts-ignore
        isApproved = await verifyEdContract.connect(signer).isApproved(address);

        console.log(isApproved);
      } catch (error) {
        console.log(error);
        setError("Error occured. Submit again");
        setIsSubmitting(false);
      }

      if (isApproved) {
        try {
          [id, _name, programme, yearOfCompletion, hash] =
            // @ts-ignore
            await verifyEdContract.connect(signer).findStudent(address, pubKey);

          setIsSubmitting(false);
          navigate(`/guest`, {
            state: {
              address: schoolAddress,
              details: { id, _name, programme, yearOfCompletion, hash },
            },
          });
        } catch (error) {
          setError("Public key does not match");
          setIsSubmitting(false);
        }
      }
      setError("Unauthoried access!");
      setIsSubmitting(false);
    }
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

      const schoolID = schoolRef.current?.value;

      if (schoolID) {
        try {
          const [schAddress, schName] = await AMLFactory.connect(signer)
            //@ts-ignore
            .getSchoolContract(BigInt(schoolID));

          console.log(schAddress);
          console.log(schName);
          setSchoolAddress(schAddress);
          setSchoolName(schName);
        } catch (error) {
          console.log(error);
          setError("Invalid School ID");
          setIsSubmitting(false);
        }
      }
      validateCredentials();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full shadow-lg border-none py-5">
        <CardHeader>
          <CardTitle className="mb-3 text-3xl font-robotoSlab">
            Welcome Back!
          </CardTitle>
          <CardDescription>
            Enter required details to login as {user}.
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
            {user == "Student" && (
              <div className="flex flex-col space-y-2 my-2">
                <Label htmlFor="studentID">
                  Student ID <span className="text-red-500">*</span>
                </Label>

                <Input
                  required
                  id="studentID"
                  placeholder="Enter your student ID"
                  ref={studentRef}
                />
              </div>
            )}
            {user == "Guest" && (
              <>
                <div className="flex flex-col space-y-2 my-2">
                  <Label htmlFor="address">
                    Student Address <span className="text-red-500">*</span>
                  </Label>

                  <Input
                    required
                    id="address"
                    placeholder="Enter the metamask wallet address of student"
                    ref={addressRef}
                  />
                </div>
                <div className="flex flex-col space-y-2 my-2">
                  <Label htmlFor="pubKey">Student Public Key</Label>

                  <Input
                    id="pubKey"
                    placeholder="Enter the public key of student if given"
                    ref={pubKeyRef}
                  />
                </div>
              </>
            )}
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
