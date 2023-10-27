import { ethers } from "ethers";
import FACTORY_ABI from "./abis/factory_abi.json";
import ABI from "./abis/abi.json";

const FACTORY_ADDRESS = "0x5B3631ec7894a8DdF0580d0707C48D939606f142";

export const AMLFactory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI);

export const AMLContract = async (ADDRESS: string) => {
  return new ethers.Contract(ADDRESS, ABI);
};
