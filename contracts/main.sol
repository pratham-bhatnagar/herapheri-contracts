// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./ShagunToken.sol";

contract Lifafa {
    ShagunToken public shagunToken;
    address public owner;


    constructor(address _erc20Shagun) {
        shagunToken = ShagunToken(_erc20Shagun);
        owner = msg.sender;

    }
    mapping (address => uint256) public randomUser;
    mapping (string  => uint256[]) public red;

    function sendLifafa(uint256 amount, string memory groupId, uint256 rand) public  {
        require(shagunToken.balanceOf(msg.sender) >= amount, "Insufficient balance");
        red[groupId].push(amount);
        randomUser[msg.sender] = rand;
    }

    function getUserRand(address userAddress) public view returns (uint256) {
        return randomUser[userAddress];
    }

    function getRedAmounts(string memory groupId) public view returns (uint256[] memory) {
        return red[groupId];
    }

}
