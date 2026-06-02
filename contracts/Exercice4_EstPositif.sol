// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Exercice 4 : Vérifier si un nombre est positif
contract Exercice4_EstPositif {
    // Retourne true si n >= 0, false sinon
    function estPositif(int n) public pure returns (bool) {
        return n >= 0;
    }
}
