import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContract } from '../hooks/useContract'
import BlockchainInfo from '../components/BlockchainInfo'
import TransactionInfo from '../components/TransactionInfo'
import { getWeb3 } from '../utils/web3'

const ADDRESS = import.meta.env.VITE_EX2_ADDRESS || ''
const ABI = [
  { "inputs": [{ "internalType": "uint256", "name": "montantEther", "type": "uint256" }], "name": "etherEnWei", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "montantWei", "type": "uint256" }], "name": "weiEnEther", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" },
]

export default function Exercice2() {
  const { call, loading, error } = useContract(ABI, ADDRESS)
  const [etherVal, setEtherVal] = useState('1')
  const [weiVal,   setWeiVal]   = useState('1000000000000000000')
  const [results,  setResults]  = useState({})
  const [refresh,  setRefresh]  = useState(0)
  const [fnName,   setFnName]   = useState('')

  const notDeployed = !ADDRESS

  async function handleEtherEnWei() {
    setFnName('etherEnWei(uint)')
    const res = await call('etherEnWei', [etherVal])
    setResults(prev => ({ ...prev, etherEnWei: res }))
    setRefresh(r => r + 1)
  }

  async function handleWeiEnEther() {
    setFnName('weiEnEther(uint)')
    const res = await call('weiEnEther', [weiVal])
    setResults(prev => ({ ...prev, weiEnEther: res }))
    setRefresh(r => r + 1)
  }

  return (
    <>
      <h1 className="page-title">Exercice 2 : Conversion des cryptomonnaies</h1>
      <Link to="/" className="sommaire-link">← Sommaire</Link>

      {notDeployed && (
        <div className="result-box warn" style={{ marginBottom: 20 }}>
          ⚠ Contrat non déployé. Lancez <code>truffle migrate</code> puis renseignez <code>VITE_EX2_ADDRESS</code>.
        </div>
      )}

      {/* Ether → Wei */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="section-header">
          <span className="section-dot" />
          <h2>etherEnWei(montantEther)</h2>
        </div>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.88rem', marginBottom: 16 }}>
          Multiplie le montant en Ether par 10<sup>18</sup> pour obtenir l'équivalent en Wei.
        </p>
        <div className="form-grid">
          <div className="input-group">
            <label>Montant en Ether</label>
            <input className="input" type="number" value={etherVal} onChange={e => setEtherVal(e.target.value)} placeholder="ex: 2" />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={handleEtherEnWei} disabled={loading || notDeployed}>
            {loading ? <span className="spinner" /> : '🔁'} Convertir en Wei
          </button>
        </div>

        {results.etherEnWei && (
          <div className={`result-box ${results.etherEnWei.success ? 'success' : 'error'}`} style={{ marginTop: 14 }}>
            {results.etherEnWei.success
              ? `✅ ${etherVal} Ether = ${results.etherEnWei.data} Wei`
              : `❌ Erreur : ${results.etherEnWei.error}`}
          </div>
        )}
      </div>

      {/* Wei → Ether */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="section-header">
          <span className="section-dot" style={{ background: 'var(--color-warn)' }} />
          <h2>weiEnEther(montantWei)</h2>
        </div>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.88rem', marginBottom: 16 }}>
          Divise le montant en Wei par 10<sup>18</sup> pour obtenir l'équivalent en Ether.
        </p>
        <div className="form-grid">
          <div className="input-group">
            <label>Montant en Wei</label>
            <input className="input" type="number" value={weiVal} onChange={e => setWeiVal(e.target.value)} placeholder="ex: 1000000000000000000" />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-accent" onClick={handleWeiEnEther} disabled={loading || notDeployed}>
            {loading ? <span className="spinner" /> : '🔁'} Convertir en Ether
          </button>
        </div>

        {results.weiEnEther && (
          <div className={`result-box ${results.weiEnEther.success ? 'success' : 'error'}`} style={{ marginTop: 14 }}>
            {results.weiEnEther.success
              ? `✅ ${weiVal} Wei = ${results.weiEnEther.data} Ether`
              : `❌ Erreur : ${results.weiEnEther.error}`}
          </div>
        )}
      </div>

      {error && <div className="result-box error">❌ {error}</div>}

      <div className="info-panels">
        <BlockchainInfo contractAddress={ADDRESS} refreshTrigger={refresh} />
        <TransactionInfo txHash={null} contractAddress={ADDRESS} functionName={fnName} refreshTrigger={refresh} />
      </div>
    </>
  )
}
