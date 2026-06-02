import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContract } from '../hooks/useContract'
import BlockchainInfo from '../components/BlockchainInfo'
import TransactionInfo from '../components/TransactionInfo'

const ADDRESS = import.meta.env.VITE_EX7_ADDRESS || ''
const ABI = [
  { "inputs": [], "name": "x", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "y", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "lo", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "la", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "dx", "type": "uint256" }, { "internalType": "uint256", "name": "dy", "type": "uint256" }], "name": "deplacerForme", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "afficheXY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "afficheInfos", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" },
  { "inputs": [], "name": "surface", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "afficheLoLa", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
]

export default function Exercice7() {
  const { call, send, loading, lastTx, error } = useContract(ABI, ADDRESS)
  const [results, setResults] = useState({})
  const [refresh, setRefresh] = useState(0)
  const [fnName,  setFnName]  = useState('')
  const [dx, setDx] = useState('1')
  const [dy, setDy] = useState('1')

  const notDeployed = !ADDRESS

  const run = async (key, method, args = [], isSend = false, name = '') => {
    setFnName(name)
    const res = isSend ? await send(method, args) : await call(method, args)
    setResults(prev => ({ ...prev, [key]: { ...res, method } }))
    setRefresh(r => r + 1)
  }

  const formatResult = (r) => {
    if (!r || !r.success) return r?.error || ''
    const d = r.data
    if (r.method === 'afficheXY')    return `Coordonnées : x = ${d[0]}, y = ${d[1]}`
    if (r.method === 'afficheInfos') return `"${d}"`
    if (r.method === 'deplacerForme') return `Déplacement réussi ! Tx: ${r.txHash.slice(0, 20)}...`
    if (r.method === 'surface')      return `Surface = ${d} unités²`
    if (r.method === 'afficheLoLa')  return `Longueur = ${d[0]}, Largeur = ${d[1]}`
    return d?.toString()
  }

  return (
    <>
      <h1 className="page-title">Exercice 7 : Programmation Orientée Objet</h1>
      <Link to="/" className="sommaire-link">← Sommaire</Link>

      {notDeployed && <div className="result-box warn" style={{ marginBottom: 20 }}>⚠ Contrat non déployé. Renseignez <code>VITE_EX7_ADDRESS</code>.</div>}

      {/* Info */}
      <div className="card" style={{ marginBottom: 20, borderLeft: '4px solid var(--color-primary)' }}>
        <div className="section-header"><span className="section-dot" /><h2>Contrat abstrait Forme → Rectangle</h2></div>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.85rem', lineHeight: 1.7 }}>
          Le contrat <code>Rectangle</code> hérite du contrat abstrait <code>Forme</code>. Il est déployé avec des coordonnées initiales (x=0, y=0), longueur=5, largeur=3.
        </p>
      </div>

      {/* Fonctions héritées de Forme */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-header"><span className="section-dot" style={{ background: 'var(--color-primary)' }} /><h2>Fonctions de Forme</h2></div>
        <div className="btn-row">
          <button className="btn btn-outline"  onClick={() => run('forme', 'afficheXY',    [], false, 'afficheXY()')}    disabled={loading || notDeployed}>📍 afficheXY()</button>
          <button className="btn btn-outline"  onClick={() => run('forme', 'afficheInfos', [], false, 'afficheInfos()')} disabled={loading || notDeployed}>ℹ afficheInfos()</button>
        </div>
        <div style={{ marginTop: 16 }}>
          <div className="form-grid">
            <div className="input-group">
              <label>dx (déplacement x)</label>
              <input className="input" type="number" value={dx} onChange={e => setDx(e.target.value)} />
            </div>
            <div className="input-group">
              <label>dy (déplacement y)</label>
              <input className="input" type="number" value={dy} onChange={e => setDy(e.target.value)} />
            </div>
          </div>
          <div className="btn-row" style={{ marginTop: 8 }}>
            <button className="btn btn-primary" onClick={() => run('forme', 'deplacerForme', [dx, dy], true, 'deplacerForme(uint,uint)')} disabled={loading || notDeployed}>
              {loading ? <span className="spinner" /> : '🚀'} deplacerForme(dx, dy)
            </button>
          </div>
        </div>

        {results.forme && (
          <div className={`result-box ${results.forme.success ? 'success' : 'error'}`} style={{ marginTop: 14 }}>
            {results.forme.success ? `✅ ${formatResult(results.forme)}` : `❌ Erreur : ${results.forme.error}`}
          </div>
        )}
      </div>

      {/* Fonctions de Rectangle */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-header"><span className="section-dot" style={{ background: 'var(--color-accent)' }} /><h2>Fonctions de Rectangle</h2></div>
        <div className="btn-row">
          <button className="btn btn-accent"  onClick={() => run('rect', 'surface',     [], false, 'surface()')}     disabled={loading || notDeployed}>📐 surface()</button>
          <button className="btn btn-outline" onClick={() => run('rect', 'afficheLoLa', [], false, 'afficheLoLa()')} disabled={loading || notDeployed}>📏 afficheLoLa()</button>
        </div>

        {results.rect && (
          <div className={`result-box ${results.rect.success ? 'success' : 'error'}`} style={{ marginTop: 14 }}>
            {results.rect.success ? `✅ ${formatResult(results.rect)}` : `❌ Erreur : ${results.rect.error}`}
          </div>
        )}
      </div>

      {error && <div className="result-box error">❌ {error}</div>}

      <div className="info-panels">
        <BlockchainInfo contractAddress={ADDRESS} refreshTrigger={refresh} />
        <TransactionInfo txHash={lastTx} contractAddress={ADDRESS} functionName={fnName} refreshTrigger={refresh} />
      </div>
    </>
  )
}
