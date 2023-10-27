import { ethers } from "ethers";
import FACTORY_ABI from "./abis/factory_abi.json";
import ABI from "./abis/abi.json";

const FACTORY_ADDRESS = "0xb33A6e7CdEB0B9B4b83300E3316dB470143c7559";

export const AMLFactory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI);

export const AMLContract = async (ADDRESS: string) => {
  return new ethers.Contract(ADDRESS, ABI);
};
