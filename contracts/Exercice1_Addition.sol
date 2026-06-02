// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Exercice 1 : Somme de deux nombres
contract Exercice1_Addition {
    uint public a = 10;
    uint public b = 20;

    // Retourne la somme des deux variables d'état
    function addition1() public view returns (uint) {
        return a + b;
    }

    // Retourne la somme de deux paramètres
    function addition2(uint x, uint y) public pure returns (uint) {
        return x + y;
    }

    // Permet de modifier les variables d'état
    function setValues(uint _a, uint _b) public {
        a = _a;
        b = _b;
    }
}
