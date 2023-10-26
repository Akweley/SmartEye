import { ethers } from "hardhat";

async function main() {
  const AMLContractFactory = await ethers.deployContract("AMLContractFactory");

  await AMLContractFactory.waitForDeployment();

  console.log(
    `AMLContractFactory contract deployed to ${AMLContractFactory.target}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
