# 🔗 PFM Blockchain – dApp TP3

> **Projet de Fin de Module** – Développement d'une dApp pour le TP 3  
> Solidity · Truffle · Ganache · ReactJS · Web3.js

---

## 📁 Structure du projet

```
PFM_BlockChain/
├── contracts/                  # 8 contrats Solidity
│   ├── Exercice1_Addition.sol
│   ├── Exercice2_Conversion.sol
│   ├── Exercice3_GestionChaines.sol
│   ├── Exercice4_EstPositif.sol
│   ├── Exercice5_Parite.sol
│   ├── Exercice6_Tableau.sol
│   ├── Exercice7_Formes.sol    (Forme abstraite + Rectangle)
│   └── Exercice8_Payment.sol
├── migrations/                 # Scripts de déploiement Truffle
├── frontend/                   # Application React (Vite)
│   ├── src/
│   │   ├── pages/              # 8 pages exercices + Home
│   │   ├── components/         # BlockchainInfo, TransactionInfo, Header
│   │   ├── hooks/              # useContract (call/send)
│   │   └── utils/web3.js       # Singleton Web3
│   └── .env                    # Adresses des contrats
├── update-env.js               # Script auto-remplissage .env
└── truffle-config.js           # Config Ganache (port 7545)
```

---

## 🚀 Démarrage rapide

### Prérequis
- **Node.js** ≥ 18
- **Ganache** (GUI ou CLI) démarré sur `http://127.0.0.1:7545`

### Étape 1 – Installer les dépendances

```bash
# Dépendances Truffle (racine)
npm install

# Dépendances React (frontend)
cd frontend && npm install && cd ..
```

### Étape 2 – Compiler les contrats

```bash
npm run compile
```

### Étape 3 – Déployer sur Ganache

> ⚠️ Assurez-vous que Ganache est démarré sur le port **7545** avant cette étape.

```bash
npm run migrate
```

### Étape 4 – Mettre à jour les adresses dans le .env

```bash
node update-env.js
```

Ce script lit automatiquement `build/contracts/*.json` et remplit `frontend/.env` avec les adresses déployées.

### Étape 5 – Lancer le frontend

```bash
cd frontend && npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 📋 Exercices

| # | Titre | Contrat | Fonctions clés |
|---|-------|---------|----------------|
| 1 | Somme de deux variables | `Exercice1_Addition` | `addition1()` view, `addition2(x,y)` pure |
| 2 | Conversion cryptomonnaies | `Exercice2_Conversion` | `etherEnWei()`, `weiEnEther()` |
| 3 | Gestion des chaînes | `GestionChaines` | `setMessage`, `concatener`, `comparer` |
| 4 | Signe d'un nombre | `Exercice4_EstPositif` | `estPositif(int)` |
| 5 | Parité d'un nombre | `Exercice5_Parite` | `estPair(uint)`, `estImpair(uint)` |
| 6 | Gestion des tableaux | `Exercice6_Tableau` | `ajouterNombre`, `getElement`, `calculerSomme` |
| 7 | POO – Formes géométriques | `Forme` (abstract) + `Rectangle` | `surface()`, `deplacerForme()`, `afficheInfos()` |
| 8 | msg.sender & msg.value | `Payment` | `receivePayment()` payable, `withdraw()` |

---

## 🛠 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run compile` | Compile tous les contrats Solidity |
| `npm run migrate` | Déploie sur Ganache |
| `node update-env.js` | Met à jour frontend/.env avec les adresses |
| `npm run deploy` | migrate + update-env en une commande |
| `cd frontend && npm run dev` | Lance le serveur de développement React |

---

## 🔧 Configuration

Le fichier `truffle-config.js` est configuré pour Ganache sur :
- Host : `127.0.0.1`
- Port : `7545`
- Compilateur Solidity : `0.8.20`
