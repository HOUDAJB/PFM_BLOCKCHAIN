import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContract } from '../hooks/useContract'
import BlockchainInfo from '../components/BlockchainInfo'
import TransactionInfo from '../components/TransactionInfo'

const ADDRESS = import.meta.env.VITE_EX5_ADDRESS || ''
const ABI = [
  { "inputs": [{ "internalType": "uint256", "name": "n", "type": "uint256" }], "name": "estPair", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "pure", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "n", "type": "uint256" }], "name": "estImpair", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "pure", "type": "function" },
]

export default function Exercice5() {
  const { call, loading } = useContract(ABI, ADDRESS)
  const [num,    setNum]    = useState('')
  const [result, setResult] = useState(null)
  const [refresh,setRefresh]= useState(0)
  const [active, setActive] = useState('')

  const notDeployed = !ADDRESS

  async function handleCheck(method) {
    setActive(method)
    const res = await call(method, [num])
    setResult({ ...res, method, input: num })
    setRefresh(r => r + 1)
  }

  return (
    <>
      <h1 className="page-title">Exercice 5 : Parité d'un nombre</h1>
      <Link to="/" className="sommaire-link">← Sommaire</Link>

      {notDeployed && <div className="result-box warn" style={{ marginBottom: 20 }}>⚠ Contrat non déployé. Renseignez <code>VITE_EX5_ADDRESS</code>.</div>}

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="section-header"><span className="section-dot" /><h2>Vérification de la parité</h2></div>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.88rem', marginBottom: 16 }}>
          Testez si un nombre entier est pair ou impair grâce à l'opérateur modulo <code>n % 2</code>.
        </p>
        <div className="form-grid">
          <div className="input-group">
            <label>Nombre entier (uint)</label>
            <input className="input" type="number" min="0" value={num} onChange={e => setNum(e.target.value)} placeholder="ex: 42" />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => handleCheck('estPair')} disabled={loading || notDeployed}>
            {loading && active === 'estPair' ? <span className="spinner" /> : '✌'} Est Pair ?
          </button>
          <button className="btn btn-accent" onClick={() => handleCheck('estImpair')} disabled={loading || notDeployed}>
            {loading && active === 'estImpair' ? <span className="spinner" /> : '☝'} Est Impair ?
          </button>
        </div>

        {result && (
          <div className={`result-box ${result.success ? (result.data ? 'success' : 'warn') : 'error'}`} style={{ marginTop: 14 }}>
            {result.success
              ? result.data
                ? `✅ ${result.input} est ${result.method === 'estPair' ? 'PAIR' : 'IMPAIR'}`
                : `⚠ ${result.input} n'est pas ${result.method === 'estPair' ? 'pair' : 'impair'}`
              : `❌ Erreur : ${result.error}`}
          </div>
        )}
      </div>

      <div className="info-panels">
        <BlockchainInfo contractAddress={ADDRESS} refreshTrigger={refresh} />
        <TransactionInfo txHash={null} contractAddress={ADDRESS} functionName={active ? `${active}(uint)` : ''} refreshTrigger={refresh} />
      </div>
    </>
  )
}
