// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Exercice 7 : Programmation Orientée Objet – Formes géométriques

// Contrat abstrait Forme
abstract contract Forme {
    uint public x;
    uint public y;

    constructor(uint _x, uint _y) {
        x = _x;
        y = _y;
    }

    // Déplacer la forme
    function deplacerForme(uint dx, uint dy) public {
        x += dx;
        y += dy;
    }

    // Retourner les coordonnées actuelles
    function afficheXY() public view returns (uint, uint) {
        return (x, y);
    }

    // Fonction virtuelle pure – à redéfinir dans les sous-classes
    function afficheInfos() public virtual pure returns (string memory) {
        return "Je suis une forme";
    }

    // Fonction virtuelle – à implémenter dans Rectangle
    function surface() public virtual view returns (uint);
}

// Contrat concret Rectangle héritant de Forme
contract Rectangle is Forme {
    uint public lo; // longueur
    uint public la; // largeur

    constructor(uint _x, uint _y, uint _longueur, uint _largeur)
        Forme(_x, _y)
    {
        lo = _longueur;
        la = _largeur;
    }

    // Calculer la surface du rectangle
    function surface() public view override returns (uint) {
        return lo * la;
    }

    // Redéfinir afficheInfos
    function afficheInfos() public pure override returns (string memory) {
        return "Je suis Rectangle";
    }

    // Retourner la longueur et la largeur
    function afficheLoLa() public view returns (uint, uint) {
        return (lo, la);
    }
}
