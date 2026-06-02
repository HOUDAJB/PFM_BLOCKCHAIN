import Web3 from 'web3'

let web3Instance = null

export function getWeb3() {
  if (!web3Instance) {
    web3Instance = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
  }
  return web3Instance
}

export async function getAccounts() {
  const web3 = getWeb3()
  return await web3.eth.getAccounts()
}

export async function getNetworkInfo() {
  const web3 = getWeb3()
  try {
    const networkId   = await web3.eth.net.getId()
    const blockNumber = await web3.eth.getBlockNumber()
    const block       = await web3.eth.getBlock(blockNumber)
    const accounts    = await web3.eth.getAccounts()
    return {
      url: 'HTTP://127.0.0.1:7545',
      networkId: networkId.toString(),
      blockNumber: blockNumber.toString(),
      block,
      account: accounts[0] || 'Non connecté',
    }
  } catch (e) {
    return null
  }
}

export async function getTxInfo(txHash, contractAddress, functionName) {
  if (!txHash) return null
  const web3 = getWeb3()
  try {
    const receipt = await web3.eth.getTransactionReceipt(txHash)
    const tx      = await web3.eth.getTransaction(txHash)
    const block   = receipt ? await web3.eth.getBlock(receipt.blockNumber) : null
    const gasPrice = tx ? BigInt(tx.gasPrice) : 0n
    const gasUsed  = receipt ? BigInt(receipt.gasUsed) : 0n
    const gasFeeWei = gasPrice * gasUsed
    const gasFeeGwei = web3.utils.fromWei(gasFeeWei.toString(), 'gwei')
    const value = tx ? web3.utils.fromWei(tx.value, 'ether') : '0'
    const balAfter = contractAddress
      ? web3.utils.fromWei(await web3.eth.getBalance(contractAddress), 'ether')
      : null

    return {
      hash:       txHash,
      from:       tx?.from,
      to:         tx?.to,
      value,
      gasUsed:    receipt?.gasUsed?.toString(),
      gasLimit:   tx?.gas?.toString(),
      gasPrice:   gasFeeGwei + ' Gwei',
      status:     receipt?.status ? 'Succès' : 'Échec',
      blockNumber: receipt?.blockNumber?.toString(),
      timestamp:  block ? new Date(Number(block.timestamp) * 1000).toLocaleString('fr-FR') : 'N/A',
      functionName,
      contractBalance: balAfter ? balAfter + ' ETH' : null,
    }
  } catch (e) {
    return null
  }
}

export function loadABI(contractName) {
  // Dynamic import of compiled Truffle artifact
  // Place compiled ABIs in src/contracts/ after truffle compile + migrate
  try {
    // ABIs are loaded via dynamic imports in each page
    return null
  } catch {
    return null
  }
}
