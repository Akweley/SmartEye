import { useAuth } from "@/context/AuthContext";
import { verifyEd } from "@/contract";
import { convertBigIntToString } from "@/utils/utils";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import { Student } from "../components/StudentsTable";
import { Approval } from "../components/Approvals";

const useQueryContract = (address: string) => {
  const [contract, setContract] = useState<Contract>();
  const [loading, setLoading] = useState(false);
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [studentCount, setStudentCount] = useState(null);
  const [approvalList, setApprovalList] = useState<Approval[]>([]);
  const { ethereum } = useAuth();

  useEffect(() => {
    (async () => {
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();

        try {
          setLoading(true);
          console.log(address);
          const contract = await verifyEd(address);
          let totalStudents;
          let students;
          let approvals;

          console.log(contract);
          setContract(contract);

          //@ts-ignore
          const isAdmin = await contract.connect(signer).isAdmin();

          //@ts-ignore
          const isStudent = await contract.connect(signer).isStudent();

          if (isAdmin) {
            totalStudents = await contract
              ?.connect(signer)
              //@ts-ignore
              .getStudentCount();
            setStudentCount(totalStudents);

            const studentsProxy = await contract
              .connect(signer)
              //@ts-ignore
              .getStudentList();
            students = Object.values(studentsProxy).map(
              (value) =>
                ({
                  // @ts-ignore
                  studentID: convertBigIntToString(value[0]),
                  // @ts-ignore
                  yearOfCompletion: convertBigIntToString(value[1]),
                  // @ts-ignore
                  name: value[2],
                  // @ts-ignore
                  programme: value[3],
                  // @ts-ignore
                  hash: value[4],
                  file: null,
                }) as Student,
            );

            console.log("all students", students);
            setStudentList(students);
          }

          if (isStudent) {
            // getStudentsList returns a proxy object

            const approvalProxy = await contract
              .connect(signer)
              //@ts-ignore
              .getApprovalsList();
            console.log(approvalProxy);
            // setApprovalList(approvalProxy);

            approvals = Object.values(approvalProxy).map(
              (value, index) =>
                ({
                  id: String(index + 1),
                  // @ts-ignore
                  account: value[0],
                  // @ts-ignore
                  isApproved: value[1],
                  // @ts-ignore
                }) as Approval,
            );

            console.log(approvals);
            setApprovalList(approvals);
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      setLoading(false);
    })();
  }, [ethereum, address]);

  return { loading, contract, studentList, studentCount, approvalList };
};

export default useQueryContract;
