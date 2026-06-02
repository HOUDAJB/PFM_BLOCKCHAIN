// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Exercice 3 : Gestion des chaînes de caractères
contract GestionChaines {
    string public message;

    // Modifier la valeur de message
    function setMessage(string memory _message) public {
        message = _message;
    }

    // Retourner la valeur de message
    function getMessage() public view returns (string memory) {
        return message;
    }

    // Concaténer deux chaînes passées en paramètres
    function concatener(string memory a, string memory b) public pure returns (string memory) {
        return string.concat(a, b);
    }

    // Concaténer message avec une autre chaîne
    function concatenerAvec(string memory autre) public view returns (string memory) {
        return string.concat(message, autre);
    }

    // Retourner la longueur d'une chaîne
    function longueur(string memory s) public pure returns (uint) {
        return bytes(s).length;
    }

    // Comparer deux chaînes (keccak256 hash comparison)
    function comparer(string memory a, string memory b) public pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
