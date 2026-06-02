import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContract } from '../hooks/useContract'
import BlockchainInfo from '../components/BlockchainInfo'
import TransactionInfo from '../components/TransactionInfo'

const ADDRESS = import.meta.env.VITE_EX6_ADDRESS || ''
const ABI = [
  { "inputs": [{ "internalType": "uint256", "name": "n", "type": "uint256" }], "name": "ajouterNombre", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getElement", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "afficheTableau", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "calculerSomme", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "getTaille", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "nombres", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
]

export default function Exercice6() {
  const { call, send, loading, lastTx, error } = useContract(ABI, ADDRESS)
  const [newNum,   setNewNum]   = useState('')
  const [index,    setIndex]    = useState('0')
  const [results,  setResults]  = useState({})
  const [tableau,  setTableau]  = useState(null)
  const [refresh,  setRefresh]  = useState(0)
  const [fnName,   setFnName]   = useState('')

  const notDeployed = !ADDRESS

  async function handleAjouter() {
    if (!newNum) return
    setFnName('ajouterNombre(uint)')
    const res = await send('ajouterNombre', [newNum])
    setResults(prev => ({ ...prev, add: res }))
    setNewNum('')
    setRefresh(r => r + 1)
    // refresh tableau display
    handleAfficheTableau()
  }

  async function handleGetElement() {
    setFnName('getElement(uint)')
    const res = await call('getElement', [index])
    setResults(prev => ({ ...prev, ops: res }))
    setRefresh(r => r + 1)
  }

  async function handleAfficheTableau() {
    setFnName('afficheTableau()')
    const res = await call('afficheTableau')
    if (res.success) setTableau(res.data)
    setResults(prev => ({ ...prev, ops: res }))
    setRefresh(r => r + 1)
  }

  async function handleSomme() {
    setFnName('calculerSomme()')
    const res = await call('calculerSomme')
    setResults(prev => ({ ...prev, ops: res }))
    setRefresh(r => r + 1)
  }

  return (
    <>
      <h1 className="page-title">Exercice 6 : Gestion des tableaux</h1>
      <Link to="/" className="sommaire-link">← Sommaire</Link>

      {notDeployed && <div className="result-box warn" style={{ marginBottom: 20 }}>⚠ Contrat non déployé. Renseignez <code>VITE_EX6_ADDRESS</code>.</div>}

      {/* Ajouter */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-header"><span className="section-dot" /><h2>Ajouter un nombre</h2></div>
        <div className="form-grid">
          <div className="input-group">
            <label>Nombre à ajouter</label>
            <input className="input" type="number" value={newNum} onChange={e => setNewNum(e.target.value)} placeholder="ex: 99" />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={handleAjouter} disabled={loading || notDeployed}>
            {loading ? <span className="spinner" /> : '➕'} ajouterNombre()
          </button>
        </div>

        {results.add && (
          <div className={`result-box ${results.add.success ? 'success' : 'error'}`} style={{ marginTop: 14 }}>
            {results.add.success
              ? `✅ Transaction validée ! Hash: ${results.add.txHash.slice(0, 20)}...`
              : `❌ Erreur : ${results.add.error}`}
          </div>
        )}
      </div>

      {/* Accès / Affichage / Somme */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-header"><span className="section-dot" style={{ background: 'var(--color-warn)' }} /><h2>Opérations sur le tableau</h2></div>
        <div className="form-grid">
          <div className="input-group">
            <label>Index</label>
            <input className="input" type="number" min="0" value={index} onChange={e => setIndex(e.target.value)} placeholder="0" />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-outline"  onClick={handleGetElement}    disabled={loading || notDeployed}>🔍 getElement(index)</button>
          <button className="btn btn-accent"   onClick={handleAfficheTableau} disabled={loading || notDeployed}>📋 afficheTableau()</button>
          <button className="btn btn-primary"  onClick={handleSomme}         disabled={loading || notDeployed}>Σ calculerSomme()</button>
        </div>

        {results.ops && (
          <div className={`result-box ${results.ops.success ? 'success' : 'error'}`} style={{ marginTop: 14 }}>
            {results.ops.success
              ? `✅ ${results.ops.data !== undefined ? 'Résultat : ' + results.ops.data?.toString() : 'Transaction envoyée !'}`
              : `❌ Erreur : ${results.ops.error}`}
          </div>
        )}
      </div>

      {/* Array visual */}
      {tableau && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="section-header"><span className="section-dot" style={{ background: 'var(--color-success)' }} /><h2>Tableau actuel</h2></div>
          <div className="array-display">
            {tableau.map((v, i) => (
              <div key={i} className="array-item" title={`Index ${i}`}>
                <span style={{ color: 'var(--color-text-3)', fontSize: '0.7rem' }}>[{i}]</span> {v.toString()}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <div className="result-box error">❌ {error}</div>}

      <div className="info-panels">
        <BlockchainInfo contractAddress={ADDRESS} refreshTrigger={refresh} />
        <TransactionInfo txHash={lastTx} contractAddress={ADDRESS} functionName={fnName} refreshTrigger={refresh} />
      </div>
    </>
  )
}
