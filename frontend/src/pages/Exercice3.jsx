import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContract } from '../hooks/useContract'
import BlockchainInfo from '../components/BlockchainInfo'
import TransactionInfo from '../components/TransactionInfo'

const ADDRESS = import.meta.env.VITE_EX3_ADDRESS || ''
const ABI = [
  { "inputs": [], "name": "message", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "string", "name": "_message", "type": "string" }], "name": "setMessage", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "getMessage", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "string", "name": "a", "type": "string" }, { "internalType": "string", "name": "b", "type": "string" }], "name": "concatener", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" },
  { "inputs": [{ "internalType": "string", "name": "autre", "type": "string" }], "name": "concatenerAvec", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "string", "name": "s", "type": "string" }], "name": "longueur", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" },
  { "inputs": [{ "internalType": "string", "name": "a", "type": "string" }, { "internalType": "string", "name": "b", "type": "string" }], "name": "comparer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "pure", "type": "function" },
]

export default function Exercice3() {
  const { call, send, loading, lastTx, error } = useContract(ABI, ADDRESS)
  const [results, setResults] = useState({})
  const [refresh, setRefresh] = useState(0)
  const [fnName,  setFnName]  = useState('')

  const [msg,        setMsg]        = useState('')
  const [chaine1,    setChaine1]    = useState('')
  const [chaine2,    setChaine2]    = useState('')
  const [autreChaine,setAutreChaine]= useState('')
  const [longueurStr,setLongueurStr]= useState('')
  const [cmpA,       setCmpA]       = useState('')
  const [cmpB,       setCmpB]       = useState('')

  const notDeployed = !ADDRESS

  const run = async (key, method, args, isSend = false, name = '') => {
    setFnName(name)
    const res = isSend ? await send(method, args) : await call(method, args)
    setResults(prev => ({ ...prev, [key]: res }))
    setRefresh(r => r + 1)
  }

  const fmt = (key, customFormatter = null) => {
    const r = results[key]
    if (!r) return null
    if (!r.success) return <div className="result-box error" style={{ marginTop: 10 }}>❌ {r.error}</div>
    if (customFormatter) return <div className="result-box success" style={{ marginTop: 10 }}>{customFormatter(r.data)}</div>
    return <div className="result-box success" style={{ marginTop: 10 }}>✅ Résultat : {r.data !== undefined ? r.data?.toString() : 'Transaction envoyée !'}</div>
  }

  return (
    <>
      <h1 className="page-title">Exercice 3 : Traitement des chaînes de caractères</h1>
      <Link to="/" className="sommaire-link">← Sommaire</Link>

      {notDeployed && <div className="result-box warn" style={{ marginBottom: 20 }}>⚠ Contrat non déployé. Renseignez <code>VITE_EX3_ADDRESS</code>.</div>}

      {/* Set/Get message */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-header"><span className="section-dot" /><h2>Set / Get Message</h2></div>
        <div className="form-grid">
          <div className="input-group" style={{ gridColumn: '1 / -1' }}>
            <label>Message</label>
            <input className="input" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Entrez un message" />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => run('msg', 'setMessage', [msg], true, 'setMessage(string)')} disabled={loading || notDeployed}>
            {loading ? <span className="spinner" /> : null} Set Message
          </button>
          <button className="btn btn-outline" onClick={() => run('msg', 'getMessage', [], false, 'getMessage()')} disabled={loading || notDeployed}>
            Get Message
          </button>
        </div>
        {fmt('msg')}
      </div>

      {/* Concaténer, Longueur, Comparer */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-header"><span className="section-dot" style={{ background: 'var(--color-warn)' }} /><h2>Opérations sur les chaînes</h2></div>
        
        {/* Concatenation Simple */}
        <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="form-grid">
            <div className="input-group">
              <label>Chaîne 1</label>
              <input className="input" value={chaine1} onChange={e => setChaine1(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Chaîne 2</label>
              <input className="input" value={chaine2} onChange={e => setChaine2(e.target.value)} />
            </div>
          </div>
          <div className="btn-row">
            <button className="btn btn-accent" onClick={() => run('concat', 'concatener', [chaine1, chaine2], false, 'concatener(string,string)')} disabled={loading || notDeployed}>Concaténer Chaîne 1 et 2</button>
          </div>
          {fmt('concat')}
        </div>

        {/* Concatenation Avec Message */}
        <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="form-grid">
            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label>Autre Chaîne à ajouter au message stocké</label>
              <input className="input" value={autreChaine} onChange={e => setAutreChaine(e.target.value)} placeholder="Ex: world" />
            </div>
          </div>
          <div className="btn-row">
            <button className="btn btn-outline" onClick={() => run('concatAvec', 'concatenerAvec', [autreChaine], false, 'concatenerAvec(string)')} disabled={loading || notDeployed}>Concaténer avec Message</button>
          </div>
          {fmt('concatAvec')}
        </div>

        {/* Longueur */}
        <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="form-grid">
            <div className="input-group">
              <label>Chaîne pour longueur</label>
              <input className="input" value={longueurStr} onChange={e => setLongueurStr(e.target.value)} />
            </div>
            <div className="input-group" style={{ alignSelf: 'flex-end' }}>
              <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => run('len', 'longueur', [longueurStr], false, 'longueur(string)')} disabled={loading || notDeployed}>Longueur</button>
            </div>
          </div>
          {fmt('len', (data) => `✅ Longueur de la chaîne : ${data}`)}
        </div>

        {/* Comparaison */}
        <div>
          <div className="form-grid">
            <div className="input-group">
              <label>Comparer A</label>
              <input className="input" value={cmpA} onChange={e => setCmpA(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Comparer B</label>
              <input className="input" value={cmpB} onChange={e => setCmpB(e.target.value)} />
            </div>
          </div>
          <div className="btn-row" style={{ marginTop: 8 }}>
            <button className="btn btn-warn" onClick={() => run('cmp', 'comparer', [cmpA, cmpB], false, 'comparer(string,string)')} disabled={loading || notDeployed}>Comparer</button>
          </div>
          {fmt('cmp', (data) => data 
            ? `✅ Les deux chaînes sont IDENTIQUES.` 
            : `⚠ Les deux chaînes sont DIFFÉRENTES.`
          )}
        </div>
      </div>

      {error && <div className="result-box error">❌ {error}</div>}

      <div className="info-panels">
        <BlockchainInfo contractAddress={ADDRESS} refreshTrigger={refresh} />
        <TransactionInfo txHash={lastTx} contractAddress={ADDRESS} functionName={fnName} refreshTrigger={refresh} />
      </div>
    </>
  )
}
