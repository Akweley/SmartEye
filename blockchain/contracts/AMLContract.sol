// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AMLContract {
    address immutable owner;

    struct Transaction {
        uint256 transactionID;
        string senderID;
        string senderAccountNumber;
        string senderAccountType;
        string senderRiskFactor;
        string recipientAccountNumber;
        string recipientBank;
        string recipientRiskFactor;
        string recipientAccountType;
        uint256 amount;
        string transactionType;
        bool isMLAlert;
    }

    uint256 _idTracker;
    Transaction[] transactions;
    mapping(string => uint256) public accountTypeLimits;

    constructor(address _admin) {
        owner = _admin;
    }

    event MLAlert(uint256 indexed transactionID, string reason);

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized access!");
        _;
    }

    function isOutBound(
        string memory _senderAccountType,
        uint256 _amount,
        string memory _recipientRiskFactor,
        uint256 _transactionID
    ) internal {
        uint256 accountLimit = accountTypeLimits[_senderAccountType];
        uint256 threshold = (accountLimit * 90) / 100;

        if ((_amount <= accountLimit && _amount >= threshold)) {
            if (
                keccak256(abi.encodePacked(_recipientRiskFactor)) ==
                keccak256(abi.encodePacked("high"))
            ) {
                transactions[_transactionID - 1].isMLAlert = true;
                emit MLAlert(
                    _transactionID,
                    "Transfer transaction is above threshold and recipient is in high risk location"
                );
            }
        }
    }

    function isInBound(
        string memory _senderRiskFactor,
        uint256 _transactionID
    ) internal {
        if (
            keccak256(abi.encodePacked(_senderRiskFactor)) ==
            keccak256(abi.encodePacked("high"))
        ) {
            transactions[_transactionID - 1].isMLAlert = true;
            emit MLAlert(
                _transactionID,
                "Sender location is high risk, and sender's account is a business account and a shell company"
            );
        }
    }

    // Function to set transaction limits for account types
    function setAccountTypeLimit(
        string memory accountType,
        uint256 limit
    ) public onlyOwner {
        accountTypeLimits[accountType] = limit;
    }

    // Function to add a transaction
    function checkMLStatus(
        string memory _senderID,
        string memory _senderAccountNumber,
        string memory _senderAccountType,
        string memory _senderRiskFactor,
        string memory _recipientAccountNumber,
        string memory _recipientBank,
        string memory _recipientRiskFactor,
        string memory _recipientAccountType,
        uint256 _amount,
        string memory _transactionType
    ) public onlyOwner {
        _idTracker++;
        transactions.push(
            Transaction(
                _idTracker,
                _senderID,
                _senderAccountNumber,
                _senderAccountType,
                _senderRiskFactor,
                _recipientAccountNumber,
                _recipientBank,
                _recipientRiskFactor,
                _recipientAccountType,
                _amount,
                _transactionType,
                false
            )
        );

        if (
            keccak256(abi.encodePacked(_transactionType)) ==
            keccak256(abi.encodePacked("transfer"))
        ) {
            isOutBound(
                _senderAccountType,
                _amount,
                _recipientRiskFactor,
                _idTracker
            );
        } else if (
            keccak256(abi.encodePacked(_transactionType)) ==
            keccak256(abi.encodePacked("deposit"))
        ) {
            isInBound(_senderRiskFactor, _idTracker);
        }
    }

    // Function to mark a transaction as cleared
    function markTransactionAsCleared(uint256 _transactionID) public onlyOwner {
        require(
            _transactionID > 0 && _transactionID <= transactions.length,
            "Invalid transaction ID"
        );
        transactions[_transactionID - 1].isMLAlert = false;
    }

    // Function to retrieve all transactions
    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }
}
