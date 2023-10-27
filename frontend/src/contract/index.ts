import { ethers } from "ethers";
import FACTORY_ABI from "./abis/factory_abi.json";
import ABI from "./abis/abi.json";

const FACTORY_ADDRESS = "0xe267967EA8d2E0B28Ac3A6f6A00483CA261e143e";

export const AMLFactory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI);

export const AMLContract = async (ADDRESS: string) => {
  return new ethers.Contract(ADDRESS, ABI);
};
