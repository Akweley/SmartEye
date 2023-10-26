import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("AMLContractFactory", function () {
  async function deployAMLContractFactoryFixture() {
    const [admin] = await ethers.getSigners();

    const AMLContractFactory = await ethers.getContractFactory(
      "AMLContractFactory",
    );
    const amlContractFactory = await AMLContractFactory.deploy();

    return { amlContractFactory, admin };
  }

  let bankName = "Sample Bank";
  let registrationNumber = "123ABC";

  it("Should create a new AMLContract", async () => {
    const { amlContractFactory, admin } = await loadFixture(
      deployAMLContractFactoryFixture,
    );
    await amlContractFactory
      .connect(admin)
      .createAMLContract(bankName, registrationNumber);

    const [contractAddress, bankNameResult] =
      await amlContractFactory.getAMLContract(registrationNumber);

    expect(contractAddress).to.not.equal(ethers.ZeroAddress);
    expect(bankNameResult).to.equal(bankName);
  });

  it("Should not allow duplicate registrations", async () => {
    const { amlContractFactory, admin } = await loadFixture(
      deployAMLContractFactoryFixture,
    );
    await amlContractFactory
      .connect(admin)
      .createAMLContract(bankName, registrationNumber);

    await expect(
      amlContractFactory.createAMLContract(bankName, registrationNumber),
    ).to.be.revertedWith("Registration number already in use!");
  });
});
