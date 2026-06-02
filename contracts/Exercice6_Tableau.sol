// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Exercice 6 : Tableau dynamique de nombres
contract Exercice6_Tableau {
    uint[] public nombres;

    // Initialiser le tableau dans le constructeur
    constructor() {
        nombres.push(10);
        nombres.push(20);
        nombres.push(30);
        nombres.push(40);
        nombres.push(50);
    }

    // Ajouter un nombre au tableau
    function ajouterNombre(uint n) public {
        nombres.push(n);
    }

    // Retourner l'élément à l'indice index (avec require)
    function getElement(uint index) public view returns (uint) {
        require(index < nombres.length, "Erreur : index hors limites du tableau");
        return nombres[index];
    }

    // Retourner tout le tableau
    function afficheTableau() public view returns (uint[] memory) {
        return nombres;
    }

    // Calculer la somme de tous les éléments
    function calculerSomme() public view returns (uint) {
        uint somme = 0;
        for (uint i = 0; i < nombres.length; i++) {
            somme += nombres[i];
        }
        return somme;
    }

    // Retourner la taille du tableau
    function getTaille() public view returns (uint) {
        return nombres.length;
    }
}
