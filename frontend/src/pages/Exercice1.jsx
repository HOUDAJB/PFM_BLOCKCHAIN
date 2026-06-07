import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContract } from '../hooks/useContract'
import BlockchainInfo from '../components/BlockchainInfo'
import TransactionInfo from '../components/TransactionInfo'

// ── Paste the ABI from build/contracts/Exercice1_Addition.json after compiling ──
const ADDRESS = import.meta.env.VITE_EX1_ADDRESS || ''
const ABI = [
  { "inputs": [], "name": "a", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "b", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "addition1", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "x", "type": "uint256" }, { "internalType": "uint256", "name": "y", "type": "uint256" }], "name": "addition2", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_a", "type": "uint256" }, { "internalType": "uint256", "name": "_b", "type": "uint256" }], "name": "setValues", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
]

export default function Exercice1() {
  const { call, send, loading, lastTx, error } = useContract(ABI, ADDRESS)
  const [results, setResults] = useState({})
  const [refresh, setRefresh] = useState(0)
  const [fnName, setFnName]   = useState('')

  // Inputs
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [x, setX] = useState('')
  const [y, setY] = useState('')

  async function handleAddition1() {
    setFnName('addition1()')
    const res = await call('addition1')
    setResults(prev => ({ ...prev, addition1: res }))
    setRefresh(r => r + 1)
  }

  async function handleAddition2() {
    if (!x || !y) return
    setFnName('addition2(uint,uint)')
    const res = await call('addition2', [x, y])
    setResults(prev => ({ ...prev, addition2: res }))
    setRefresh(r => r + 1)
  }

  async function handleSetValues() {
    if (!a || !b) return
    setFnName('setValues(uint,uint)')
    const res = await send('setValues', [a, b])
    setResults(prev => ({ ...prev, setValues: res }))
    setRefresh(r => r + 1)
  }

  const notDeployed = !ADDRESS

  return (
    <>
      <h1 className="page-title">Exercice 1 : Somme de deux variables</h1>
      <Link to="/" className="sommaire-link">← Sommaire</Link>

      {notDeployed && (
        <div className="result-box warn" style={{ marginBottom: 20 }}>
          ⚠ Contrat non déployé. Lancez <code>truffle migrate</code> puis renseignez <code>VITE_EX1_ADDRESS</code> dans le fichier <code>.env</code>.
        </div>
      )}

      {/* Section 1 – Addition1 (view) */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="section-header">
          <span className="section-dot" />
          <h2>addition1() — <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>view</span></h2>
        </div>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.88rem', marginBottom: 16 }}>
          Retourne la somme des deux variables d'état <code>a</code> et <code>b</code>.
        </p>
        <div className="form-grid">
          <div className="input-group">
            <label>Valeur de a</label>
            <input className="input" type="number" value={a} onChange={e => setA(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Valeur de b</label>
            <input className="input" type="number" value={b} onChange={e => setB(e.target.value)} />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-outline" onClick={handleSetValues} disabled={loading || notDeployed}>
            {loading ? <span className="spinner" /> : null} Définir a & b
          </button>
          <button className="btn btn-primary" onClick={handleAddition1} disabled={loading || notDeployed}>
            {loading ? <span className="spinner" /> : null} Calculer addition1()
          </button>
        </div>

        {results.setValues && (
          <div className={`result-box ${results.setValues.success ? 'success' : 'error'}`} style={{ marginTop: 14 }}>
            {results.setValues.success
              ? `✅ Variables d'état mises à jour sur la blockchain !`
              : `❌ Erreur : ${results.setValues.error}`}
          </div>
        )}
        {results.addition1 && (
          <div className={`result-box ${results.addition1.success ? 'success' : 'error'}`} style={{ marginTop: 14 }}>
            {results.addition1.success
              ? `✅ Somme (a + b) = ${results.addition1.data}`
              : `❌ Erreur : ${results.addition1.error}`}
          </div>
        )}
      </div>

      {/* Section 2 – Addition2 (pure) */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="section-header">
          <span className="section-dot" style={{ background: 'var(--color-warn)' }} />
          <h2>addition2(x, y) — <span style={{ color: 'var(--color-warn)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>pure</span></h2>
        </div>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.88rem', marginBottom: 16 }}>
          Retourne la somme de deux paramètres x et y, sans lire l'état.
        </p>
        <div className="form-grid">
          <div className="input-group">
            <label>x</label>
            <input className="input" type="number" value={x} onChange={e => setX(e.target.value)} placeholder="ex: 5" />
          </div>
          <div className="input-group">
            <label>y</label>
            <input className="input" type="number" value={y} onChange={e => setY(e.target.value)} placeholder="ex: 7" />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-accent" onClick={handleAddition2} disabled={loading || notDeployed}>
            {loading ? <span className="spinner" /> : null} Calculer addition2(x, y)
          </button>
        </div>

        {results.addition2 && (
          <div className={`result-box ${results.addition2.success ? 'success' : 'error'}`} style={{ marginTop: 14 }}>
            {results.addition2.success
              ? `✅ Somme (x + y) = ${results.addition2.data}`
              : `❌ Erreur : ${results.addition2.error}`}
          </div>
        )}
      </div>

      {error && <div className="result-box error">❌ {error}</div>}

      {/* Blockchain & TX panels */}
      <div className="info-panels">
        <BlockchainInfo contractAddress={ADDRESS} refreshTrigger={refresh} />
        <TransactionInfo txHash={lastTx} contractAddress={ADDRESS} functionName={fnName} refreshTrigger={refresh} />
      </div>
    </>
  )
}
