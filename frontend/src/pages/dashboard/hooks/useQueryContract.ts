/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAuth } from "@/context/AuthContext";
import { AMLContract } from "@/contract";
// import { convertBigIntToString } from "@/utils/utils";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";

const useQueryContract = (address: string) => {
  const [contract, setContract] = useState<Contract>();
  const [loading, setLoading] = useState(false);
  // const [txns, setTxns] = useState([]);

  const { ethereum } = useAuth();

  useEffect(() => {
    (async () => {
      if (ethereum) {
        const provider = new ethers.BrowserProvider(
          ethereum as ethers.Eip1193Provider,
        );
        const signer = await provider.getSigner();

        try {
          setLoading(true);
          console.log(address);
          const contract = await AMLContract(address);
          console.log(contract);
          setContract(contract);

          const txnsProxy = await contract
            .connect(signer)
            //@ts-ignore
            .getTransactions();

          console.log(txnsProxy);

          //  const transactions = Object.values(txnsProxy).map(
          //     (value) =>
          //       ({
          //         // @ts-ignore
          //         studentID: convertBigIntToString(value[0]),
          //         // @ts-ignore
          //         yearOfCompletion: convertBigIntToString(value[1]),
          //         // @ts-ignore
          //         name: value[2],
          //         // @ts-ignore
          //         programme: value[3],
          //         // @ts-ignore
          //         hash: value[4],
          //         file: null,
          //       } ),
          // );
          // console.log(transactions);
          // setTxns(transactions);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      setLoading(false);
    })();
  }, [ethereum, address]);

  return { loading, contract };
};

export default useQueryContract;
