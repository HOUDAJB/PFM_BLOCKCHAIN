import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContract } from '../hooks/useContract'
import { getWeb3, getAccounts } from '../utils/web3'
import BlockchainInfo from '../components/BlockchainInfo'
import TransactionInfo from '../components/TransactionInfo'

const ADDRESS = import.meta.env.VITE_EX8_ADDRESS || ''
const ABI = [
  { "inputs": [], "name": "recipient", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "receivePayment", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "getBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
]

export default function Exercice8() {
  const { call, send, loading, lastTx, error } = useContract(ABI, ADDRESS)
  const [amount,    setAmount]    = useState('0.01')
  const [results,   setResults]   = useState({})
  const [refresh,   setRefresh]   = useState(0)
  const [fnName,    setFnName]    = useState('')
  const [balance,   setBalance]   = useState(null)
  const [recipient, setRecipient] = useState(null)

  const notDeployed = !ADDRESS

  async function handleGetBalance() {
    setFnName('getBalance()')
    const res = await call('getBalance')
    if (res.success) {
      const web3 = getWeb3()
      setBalance(web3.utils.fromWei(res.data.toString(), 'ether'))
    }
    setResults(prev => ({ ...prev, info: res }))
    setRefresh(r => r + 1)
  }

  async function handleGetRecipient() {
    const res = await call('recipient')
    if (res.success) setRecipient(res.data)
    setResults(prev => ({ ...prev, info: res }))
    setRefresh(r => r + 1)
  }

  async function handleReceive() {
    if (!amount || parseFloat(amount) <= 0) {
      setResults(prev => ({ ...prev, receive: { success: false, error: 'Le montant doit être supérieur à 0' } }))
      return
    }
    setFnName('receivePayment()')
    const web3  = getWeb3()
    const value = web3.utils.toWei(amount, 'ether')
    const res   = await send('receivePayment', [], { value })
    setResults(prev => ({ ...prev, receive: res }))
    setRefresh(r => r + 1)
    handleGetBalance()
  }

  async function handleWithdraw() {
    setFnName('withdraw()')
    const res = await send('withdraw', [])
    setResults(prev => ({ ...prev, withdraw: res }))
    setRefresh(r => r + 1)
    handleGetBalance()
  }

  return (
    <>
      <h1 className="page-title">Exercice 8 : Variables globales msg.sender & msg.value</h1>
      <Link to="/" className="sommaire-link">← Sommaire</Link>

      {notDeployed && <div className="result-box warn" style={{ marginBottom: 20 }}>⚠ Contrat non déployé. Renseignez <code>VITE_EX8_ADDRESS</code>.</div>}

      {/* Infos contrat */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-header"><span className="section-dot" /><h2>État du contrat Payment</h2></div>
        <div className="btn-row">
          <button className="btn btn-outline" onClick={handleGetRecipient} disabled={loading || notDeployed}>👤 Voir recipient</button>
          <button className="btn btn-outline" onClick={handleGetBalance}   disabled={loading || notDeployed}>💰 Voir solde</button>
        </div>
        {recipient && (
          <div className="result-box" style={{ marginTop: 14 }}>
            Destinataire (recipient) : <span style={{ color: 'var(--color-primary)' }}>{recipient}</span>
          </div>
        )}
        {balance !== null && (
          <div className="result-box success" style={{ marginTop: 8 }}>
            Solde du contrat : <strong>{balance} ETH</strong>
          </div>
        )}
        {results.info && !results.info.success && (
          <div className="result-box error" style={{ marginTop: 8 }}>
            ❌ Erreur : {results.info.error}
          </div>
        )}
      </div>

      {/* Envoyer des ETH */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-header"><span className="section-dot" style={{ background: 'var(--color-warn)' }} /><h2>receivePayment() — payable</h2></div>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.85rem', marginBottom: 16 }}>
          Envoie des Ethers au contrat. Utilise <code>msg.value</code> pour vérifier que le montant &gt; 0.
        </p>
        <div className="form-grid">
          <div className="input-group">
            <label>Montant à envoyer (ETH)</label>
            <input className="input" type="number" step="0.001" min="0.001" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.01" />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-warn" onClick={handleReceive} disabled={loading || notDeployed}>
            {loading ? <span className="spinner" /> : '💸'} Envoyer {amount} ETH
          </button>
        </div>

        {results.receive && (
          <div className={`result-box ${results.receive.success ? 'success' : 'error'}`} style={{ marginTop: 14 }}>
            {results.receive.success
              ? `✅ Dépôt de ${amount} ETH effectué ! Tx: ${results.receive.txHash.slice(0, 20)}...`
              : `❌ Erreur : ${results.receive.error}`}
          </div>
        )}
      </div>

      {/* Retirer */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-header"><span className="section-dot" style={{ background: 'var(--color-danger)' }} /><h2>withdraw() — retrait</h2></div>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.85rem', marginBottom: 16 }}>
          Transfère tout le solde vers le destinataire. Vérifie que <code>msg.sender == recipient</code>.
        </p>
        <div className="btn-row">
          <button className="btn btn-danger" onClick={handleWithdraw} disabled={loading || notDeployed}>
            {loading ? <span className="spinner" /> : '🏦'} Retirer les fonds
          </button>
        </div>

        {results.withdraw && (
          <div className={`result-box ${results.withdraw.success ? 'success' : 'error'}`} style={{ marginTop: 14 }}>
            {results.withdraw.success
              ? `✅ Retrait effectué avec succès ! Tx: ${results.withdraw.txHash.slice(0, 20)}...`
              : `❌ Erreur : ${results.withdraw.error}`}
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
