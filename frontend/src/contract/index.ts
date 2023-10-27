import { ethers } from "ethers";
import FACTORY_ABI from "./abis/factory_abi.json";
import ABI from "./abis/abi.json";

const FACTORY_ADDRESS = "0x40c597eeD5bc59eEfdc79f283Cd43b26B369096c";

export const AMLFactory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI);

export const AMLContract = async (ADDRESS: string) => {
  return new ethers.Contract(ADDRESS, ABI);
};
