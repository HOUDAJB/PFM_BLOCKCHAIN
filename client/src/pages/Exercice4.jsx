import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContract } from '../hooks/useContract'
import BlockchainInfo from '../components/BlockchainInfo'
import TransactionInfo from '../components/TransactionInfo'

const ADDRESS = import.meta.env.VITE_EX4_ADDRESS || ''
const ABI = [
  { "inputs": [{ "internalType": "int256", "name": "n", "type": "int256" }], "name": "estPositif", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "pure", "type": "function" },
]

export default function Exercice4() {
  const { call, loading } = useContract(ABI, ADDRESS)
  const [num,    setNum]    = useState('0')
  const [result, setResult] = useState(null)
  const [refresh,setRefresh]= useState(0)

  const notDeployed = !ADDRESS

  async function handleCheck() {
    const res = await call('estPositif', [num])
    setResult({ ...res, input: num })
    setRefresh(r => r + 1)
  }

  return (
    <>
      <h1 className="page-title">Exercice 4 : Tester le signe d'un nombre</h1>
      <Link to="/" className="sommaire-link">← Sommaire</Link>

      {notDeployed && <div className="result-box warn" style={{ marginBottom: 20 }}>⚠ Contrat non déployé. Renseignez <code>VITE_EX4_ADDRESS</code>.</div>}

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="section-header"><span className="section-dot" /><h2>estPositif(int n)</h2></div>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.88rem', marginBottom: 16 }}>
          Retourne <code>true</code> si n ≥ 0, <code>false</code> sinon. Accepte les entiers signés (positifs et négatifs).
        </p>
        <div className="form-grid">
          <div className="input-group">
            <label>Entier signé (int)</label>
            <input className="input" type="number" value={num} onChange={e => setNum(e.target.value)} placeholder="ex: -5 ou 42" />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={handleCheck} disabled={loading || notDeployed}>
            {loading ? <span className="spinner" /> : '🔍'} Vérifier le signe
          </button>
        </div>

        {result && (
          <div className={`result-box ${result.success ? (result.data ? 'success' : 'error') : 'error'}`} style={{ marginTop: 14 }}>
            {result.success
              ? result.data
                ? `✅ ${result.input} est POSITIF (≥ 0)`
                : `❌ ${result.input} est NÉGATIF (< 0)`
              : `❌ Erreur : ${result.error}`}
          </div>
        )}
      </div>

      <div className="info-panels">
        <BlockchainInfo contractAddress={ADDRESS} refreshTrigger={refresh} />
        <TransactionInfo txHash={null} contractAddress={ADDRESS} functionName="estPositif(int)" refreshTrigger={refresh} />
      </div>
    </>
  )
}
