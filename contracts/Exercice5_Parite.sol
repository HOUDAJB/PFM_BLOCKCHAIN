// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Exercice 5 : Vérifier la parité d'un nombre entier
contract Exercice5_Parite {
    // Retourne true si le nombre est pair, false sinon
    function estPair(uint n) public pure returns (bool) {
        return n % 2 == 0;
    }

    // Retourne true si le nombre est impair
    function estImpair(uint n) public pure returns (bool) {
        return n % 2 != 0;
    }
}
