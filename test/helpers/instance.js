/**
 * Creats a client instance for testing
 **/
const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')

const EFX = require('../../src/efx')

module.exports = async () => {
  const infuraURL = process.env.INFURA_URL
  const privateKey = process.env.PRIVATE_KEY

  const provider = new HDWalletProvider(privateKey, infuraURL)

  const web3 = new Web3(provider)

  let config = {}

  // It's possible to overwrite the API address with the testnet address
  // for example like this:
  config.api = 'https://staging-api.deversifi.com/v1/trading'
  // config.api = 'http://localhost:7777/v1/trading'
  return EFX(web3, config)
}
