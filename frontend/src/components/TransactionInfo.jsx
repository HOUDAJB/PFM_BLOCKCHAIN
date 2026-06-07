import { useState, useEffect } from 'react'
import { getTxInfo } from '../utils/web3'

export default function TransactionInfo({ txHash, contractAddress, functionName, refreshTrigger }) {
  const [tx, setTx]       = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!txHash) return
    setLoading(true)
    getTxInfo(txHash, contractAddress, functionName).then(data => {
      setTx(data)
      setLoading(false)
    })
  }, [txHash, refreshTrigger])

  if (!txHash && !loading) return (
    <div className="info-panel">
      <div className="info-panel-header" style={{ background: 'linear-gradient(90deg, #22d98a 0%, #0d9e68 100%)' }}>
        📋 Transactions
      </div>
      <div className="info-panel-body" style={{ color: 'var(--color-text-3)', fontSize: '0.85rem', padding: 20 }}>
        Aucune transaction effectuée pour l'instant.
      </div>
    </div>
  )

  return (
    <div className="info-panel">
      <div className="info-panel-header" style={{ background: 'linear-gradient(90deg, #22d98a 0%, #0d9e68 100%)' }}>
        📋 Transactions (1)
      </div>
      <div className="info-panel-body">
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-3)', fontSize: '0.85rem' }}>
            <span className="spinner" /> Chargement de la transaction…
          </div>
        ) : !tx ? (
          <div className="result-box error">Transaction introuvable</div>
        ) : (
          <>
            <div style={{ color: '#22d98a', fontWeight: 700, fontSize: '0.8rem', marginBottom: 4 }}>
              Transaction #1
            </div>
            <div className="info-row"><span className="label">Hash</span><span className="value" style={{ fontSize: '0.7rem' }}>{tx.hash?.slice(0, 32)}…</span></div>
            <div className="info-row"><span className="label">Expéditeur</span><span className="value" style={{ fontSize: '0.72rem' }}>{tx.from}</span></div>
            <div className="info-row"><span className="label">Destinataire</span><span className="value" style={{ fontSize: '0.72rem' }}>{tx.to || 'Déploiement'}</span></div>
            <div className="info-row"><span className="label">Montant</span><span className="value">{tx.value} ETH</span></div>
            <div className="info-row"><span className="label">Frais (Gas)</span><span className="value">{tx.gasPrice}</span></div>
            <div className="info-row"><span className="label">Gas Limit</span><span className="value">{tx.gasLimit}</span></div>
            <div className="info-row"><span className="label">Gas Utilisé</span><span className="value">{tx.gasUsed}</span></div>
            <div className="info-row">
              <span className="label">Statut</span>
              <span className={`value ${tx.status === 'Succès' ? 'ok' : 'err'}`}>{tx.status}</span>
            </div>
            <div className="info-row"><span className="label">Bloc</span><span className="value">#{tx.blockNumber}</span></div>
            <div className="info-row"><span className="label">Horodatage</span><span className="value">{tx.timestamp}</span></div>
            {tx.functionName && (
              <div className="info-row"><span className="label">Fonction</span><span className="value highlight">{tx.functionName}</span></div>
            )}
            {tx.contractBalance && (
              <div className="info-row"><span className="label">Solde contrat</span><span className="value">{tx.contractBalance}</span></div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
