import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="app-header">
      <h1>⛓ Projet de Fin de Module</h1>
      <p className="subtitle">Développement d'une dApp pour le TP 3</p>
      <span className="tech-badge">Solidity · Truffle · Ganache · ReactJS · Web3.js</span>
    </header>
  )
}
