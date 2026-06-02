// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Exercice 2 : Conversion de cryptomonnaies
contract Exercice2_Conversion {
    // Convertit des Ethers en Wei
    function etherEnWei(uint montantEther) public pure returns (uint) {
        return montantEther * 1 ether;
    }

    // Convertit des Wei en Ether
    function weiEnEther(uint montantWei) public pure returns (uint) {
        return montantWei / 1 ether;
    }
}
