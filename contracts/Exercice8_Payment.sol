// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Exercice 8 : Gestion des transactions avec msg.sender et msg.value
contract Payment {
    address public recipient;

    constructor(address _recipient) {
        recipient = _recipient;
    }

    // Recevoir des Ethers – vérifie que msg.value > 0
    function receivePayment() public payable {
        require(msg.value > 0, "Erreur : le montant envoye doit etre superieur a 0");
    }

    // Retirer les fonds vers le destinataire
    function withdraw() public {
        require(msg.sender == recipient, "Erreur : seul le destinataire peut retirer les fonds");
        payable(recipient).transfer(address(this).balance);
    }

    // Consulter le solde du contrat
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
