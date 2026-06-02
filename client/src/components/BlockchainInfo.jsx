import { useState, useEffect } from 'react'
import { getNetworkInfo } from '../utils/web3'

export default function BlockchainInfo({ contractAddress, refreshTrigger }) {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInfo()
  }, [refreshTrigger])

  async function fetchInfo() {
    setLoading(true)
    const data = await getNetworkInfo()
    setInfo(data)
    setLoading(false)
  }

  const block = info?.block

  return (
    <div className="info-panel">
      <div className="info-panel-header">
        🔗 Informations de la Blockchain
      </div>
      <div className="info-panel-body">
        {loading ? (
          <div style={{ color: 'var(--color-text-3)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="spinner" /> Connexion à Ganache…
          </div>
        ) : !info ? (
          <div className="result-box error">❌ Impossible de se connecter à Ganache (127.0.0.1:7545)</div>
        ) : (
          <>
            <div style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.8rem', marginBottom: 4 }}>
              Infos du réseau
            </div>
            <div className="info-row"><span className="label">URL</span><span className="value highlight">{info.url}</span></div>
            <div className="info-row"><span className="label">ID réseau</span><span className="value">{info.networkId}</span></div>
            <div className="info-row"><span className="label">Compte</span><span className="value" style={{ fontSize: '0.72rem' }}>{info.account}</span></div>

            {contractAddress && (
              <>
                <div style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.8rem', margin: '8px 0 4px' }}>
                  Infos du contrat
                </div>
                <div className="info-row"><span className="label">Adresse</span><span className="value" style={{ fontSize: '0.72rem' }}>{contractAddress}</span></div>
              </>
            )}

            {block && (
              <>
                <div style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.8rem', margin: '8px 0 4px' }}>
                  Dernier bloc
                </div>
                <div className="info-row"><span className="label">N°</span><span className="value highlight">#{info.blockNumber}</span></div>
                <div className="info-row"><span className="label">Hash</span><span className="value" style={{ fontSize: '0.7rem' }}>{block.hash?.slice(0, 32)}…</span></div>
                <div className="info-row">
                  <span className="label">Timestamp</span>
                  <span className="value">{new Date(Number(block.timestamp) * 1000).toLocaleString('fr-FR')}</span>
                </div>
                <div className="info-row"><span className="label">Transactions</span><span className="value">{block.transactions?.length ?? 0}</span></div>
                <div className="info-row"><span className="label">Gas Limit</span><span className="value">{block.gasLimit?.toString()}</span></div>
                <div className="info-row"><span className="label">Gas Used</span><span className="value">{block.gasUsed?.toString()}</span></div>
                <div className="info-row"><span className="label">Difficulté</span><span className="value">{block.difficulty?.toString()}</span></div>
                <div className="info-row"><span className="label">Taille</span><span className="value">{block.size?.toString()} bytes</span></div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
