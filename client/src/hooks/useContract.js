import { useState, useCallback } from 'react'
import { getWeb3, getAccounts } from '../utils/web3'

/**
 * useContract – generic hook for interacting with a deployed Truffle contract.
 * @param {object} abi       – Contract ABI array
 * @param {string} address   – Deployed contract address
 */
export function useContract(abi, address) {
  const [loading, setLoading]   = useState(false)
  const [lastTx, setLastTx]     = useState(null)
  const [error, setError]       = useState(null)

  const call = useCallback(async (method, args = [], opts = {}) => {
    setLoading(true)
    setError(null)
    try {
      const web3     = getWeb3()
      const accounts = await getAccounts()
      const contract = new web3.eth.Contract(abi, address)
      const result   = await contract.methods[method](...args).call({ from: accounts[0], ...opts })
      setLoading(false)
      return { success: true, data: result }
    } catch (e) {
      setError(e.message)
      setLoading(false)
      return { success: false, error: e.message }
    }
  }, [abi, address])

  const send = useCallback(async (method, args = [], opts = {}) => {
    setLoading(true)
    setError(null)
    try {
      const web3     = getWeb3()
      const accounts = await getAccounts()
      const contract = new web3.eth.Contract(abi, address)
      const receipt  = await contract.methods[method](...args).send({ from: accounts[0], ...opts })
      setLastTx(receipt.transactionHash)
      setLoading(false)
      return { success: true, txHash: receipt.transactionHash, receipt }
    } catch (e) {
      setError(e.message)
      setLoading(false)
      return { success: false, error: e.message }
    }
  }, [abi, address])

  return { call, send, loading, lastTx, error }
}
