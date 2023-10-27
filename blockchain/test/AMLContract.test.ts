import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ContractRunner, ContractTransactionResponse } from "ethers";
import { ethers } from "hardhat";
import { AMLContract } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("AMLContract", function () {
  async function deployAMLContractFixture() {
    const [admin, sender, recipient, other] = await ethers.getSigners();

    const AMLContract = await ethers.getContractFactory("AMLContract");
    const amlContract = await AMLContract.deploy(admin.address);

    return { amlContract, admin, sender, recipient, other };
  }

  describe("setAccountTypeLimit", function () {
    it("Should allow the admin to set an account type limit", async function () {
      const { amlContract, admin } = await loadFixture(
        deployAMLContractFixture,
      );
      const accountType = "business";
      const newLimit = 1000;

      await amlContract
        .connect(admin)
        .setAccountTypeLimit(accountType, newLimit);
      const limit = await amlContract.accountTypeLimits(accountType);
      expect(limit).to.equal(newLimit);
    });

    it("Should revert when a non-admin attempts to set an account type limit", async function () {
      const { amlContract, other } = await loadFixture(
        deployAMLContractFixture,
      );
      const accountType = "business";
      const newLimit = 1000;

      await expect(
        amlContract.connect(other).setAccountTypeLimit(accountType, newLimit),
      ).to.be.revertedWith("Unauthorized access!");
    });

    it("Should update an existing account type limit", async function () {
      const { amlContract, admin } = await loadFixture(
        deployAMLContractFixture,
      );
      const accountType = "business";
      const newLimit = 1000;
      const updatedLimit = 1500;

      await amlContract
        .connect(admin)
        .setAccountTypeLimit(accountType, newLimit);
      let limit = await amlContract.accountTypeLimits(accountType);
      expect(limit).to.equal(newLimit);

      await amlContract
        .connect(admin)
        .setAccountTypeLimit(accountType, updatedLimit);
      limit = await amlContract.accountTypeLimits(accountType);
      expect(limit).to.equal(updatedLimit);
    });
  });

  describe("checkMLStatus", function () {
    let amlContract: AMLContract & {
      deploymentTransaction(): ContractTransactionResponse;
    };
    let admin: HardhatEthersSigner | ContractRunner | null | undefined;
    let sender;
    let recipient: HardhatEthersSigner | ContractRunner | null | undefined;
    const senderID = "1234";
    const senderAccountNumber = "A123";
    const accountType1 = "personal";
    const accountType2 = "business";
    let senderRiskFactor = "low";
    const recipientAccountNumber = "B456";
    const recipientBank = "XYZ Bank";
    let recipientRiskFactor = "high";
    let amount = 1000;
    let transactionType = "outbound";

    beforeEach(async () => {
      const res = await loadFixture(deployAMLContractFixture);
      amlContract = res.amlContract;
      admin = res.admin;
      sender = res.sender;
      recipient = res.recipient;

      await amlContract.connect(admin).setAccountTypeLimit(accountType1, 1000);
      await amlContract.connect(admin).setAccountTypeLimit(accountType2, 10000);
    });
    describe("outbound", function () {
      beforeEach(async () => {
        transactionType = "outbound";
      });
      it("Should create a outbound transaction and trigger an AML alert if riskFactor is high", async () => {
        await amlContract
          .connect(admin)
          .checkMLStatus(
            senderID,
            senderAccountNumber,
            accountType1,
            senderRiskFactor,
            recipientAccountNumber,
            recipientBank,
            recipientRiskFactor,
            accountType2,
            amount,
            transactionType,
          );

        const transactions = await amlContract.getAllTransactions();
        expect(transactions.length).to.equal(1);
        expect(transactions[0].isMLAlert).to.equal(true);
      });

      it("Should create a outbound transaction without triggering an AML alert if riskfactor is not high", async () => {
        recipientRiskFactor = "low";

        await amlContract
          .connect(admin)
          .checkMLStatus(
            senderID,
            senderAccountNumber,
            accountType1,
            senderRiskFactor,
            recipientAccountNumber,
            recipientBank,
            recipientRiskFactor,
            accountType2,
            amount,
            transactionType,
          );

        const transactions = await amlContract.getAllTransactions();
        expect(transactions.length).to.equal(1);
        expect(transactions[0].isMLAlert).to.equal(false);
      });

      it("Should create a outbound transaction without triggering an AML alert", async () => {
        amount = 500;

        await amlContract
          .connect(admin)
          .checkMLStatus(
            senderID,
            senderAccountNumber,
            accountType1,
            senderRiskFactor,
            recipientAccountNumber,
            recipientBank,
            recipientRiskFactor,
            accountType2,
            amount,
            transactionType,
          );

        const transactions = await amlContract.getAllTransactions();
        expect(transactions.length).to.equal(1);
        expect(transactions[0].isMLAlert).to.equal(false);
      });
    });

    describe("inbound", function () {
      beforeEach(async () => {
        transactionType = "inbound";
      });

      it("Should create a inbound transaction without triggering an AML alert", async () => {
        await amlContract
          .connect(admin)
          .checkMLStatus(
            senderID,
            senderAccountNumber,
            accountType1,
            senderRiskFactor,
            recipientAccountNumber,
            recipientBank,
            recipientRiskFactor,
            accountType2,
            amount,
            transactionType,
          );

        const transactions = await amlContract.getAllTransactions();
        expect(transactions[0].isMLAlert).to.equal(false);
      });

      it("Should create a inbound transaction and trigger an AML alert if riskFactor is high", async () => {
        senderRiskFactor = "high";

        await amlContract
          .connect(admin)
          .checkMLStatus(
            senderID,
            senderAccountNumber,
            accountType1,
            senderRiskFactor,
            recipientAccountNumber,
            recipientBank,
            recipientRiskFactor,
            accountType2,
            amount,
            transactionType,
          );

        const transactions = await amlContract.getAllTransactions();
        expect(transactions[0].isMLAlert).to.equal(true);
      });
    });

    describe("markTransactionAsCleared", function () {
      let transactionID = 1;
      beforeEach(async () => {
        await amlContract
          .connect(admin)
          .checkMLStatus(
            senderID,
            senderAccountNumber,
            accountType1,
            senderRiskFactor,
            recipientAccountNumber,
            recipientBank,
            recipientRiskFactor,
            accountType2,
            amount,
            transactionType,
          );
      });

      it("Should mark a transaction as cleared", async () => {
        await amlContract.connect(admin).toggleTransactionStatus(transactionID);

        const transactions = await amlContract.getAllTransactions();
        const clearedTransaction = transactions[transactionID - 1];
        expect(clearedTransaction.isMLAlert).to.be.false;
      });

      it("Should revert when a non-admin attempts to mark a transaction as cleared", async () => {
        await expect(
          amlContract.connect(recipient).toggleTransactionStatus(transactionID),
        ).to.be.revertedWith("Unauthorized access!");
      });

      it("Should revert when attempting to mark an invalid transaction as cleared", async () => {
        transactionID = 0;

        await expect(
          amlContract.connect(admin).toggleTransactionStatus(transactionID),
        ).to.be.revertedWith("Invalid transaction ID!");
      });
    });

    it("Should not create a transaction with an invalid transaction type", async () => {
      transactionType = "invalid";
      const { amlContract, admin } = await loadFixture(
        deployAMLContractFixture,
      );

      await expect(
        amlContract
          .connect(admin)
          .checkMLStatus(
            senderID,
            senderAccountNumber,
            accountType1,
            senderRiskFactor,
            recipientAccountNumber,
            recipientBank,
            recipientRiskFactor,
            accountType2,
            amount,
            transactionType,
          ),
      ).to.be.revertedWith("Invalid transaction type!");
    });

    it("Should not check ml status if not admin", async () => {
      const { amlContract, sender } = await loadFixture(
        deployAMLContractFixture,
      );

      await expect(
        amlContract
          .connect(sender)
          .checkMLStatus(
            senderID,
            senderAccountNumber,
            accountType1,
            senderRiskFactor,
            recipientAccountNumber,
            recipientBank,
            recipientRiskFactor,
            accountType2,
            amount,
            transactionType,
          ),
      ).to.be.revertedWith("Invalid transaction type!");
    });

    it("Should handle a transfer transaction within the account type limit", async () => {
      const { amlContract, admin } = await loadFixture(
        deployAMLContractFixture,
      );
      transactionType = "outbound";
      amount = 900;

      await amlContract
        .connect(admin)
        .checkMLStatus(
          senderID,
          senderAccountNumber,
          accountType1,
          senderRiskFactor,
          recipientAccountNumber,
          recipientBank,
          recipientRiskFactor,
          accountType2,
          amount,
          transactionType,
        );

      const transactions = await amlContract.getAllTransactions();
      expect(transactions[0].isMLAlert).to.equal(false);
    });
  });
});
