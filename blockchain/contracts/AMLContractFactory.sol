// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./AMLContract.sol";

contract AMLContractFactory {
    struct Bank {
        address contractAddress;
        string name;
        string registrationNumber;
    }

    mapping(string => Bank) public deployedContracts;

    event ContractCreated(address indexed contractAddress);

    // Function to create a new AMLContract
    function createAMLContract(
        string memory _name,
        string memory _registrationNumber
    ) public {
        require(
            deployedContracts[_registrationNumber].contractAddress ==
                address(0),
            "Registration number already in use!"
        );
        AMLContract newContract = new AMLContract(msg.sender);
        deployedContracts[_registrationNumber] = Bank(
            address(newContract),
            _name,
            _registrationNumber
        );

        emit ContractCreated(address(newContract));
    }

    // Function to get the address of a deployed AMLContract
    function getAMLContract(
        string memory _registrationNumber
    ) public view returns (address, string memory) {
        return (
            deployedContracts[_registrationNumber].contractAddress,
            deployedContracts[_registrationNumber].name
        );
    }
}
