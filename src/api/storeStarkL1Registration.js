/**
 * Backup the Stark L1 registration payload for the currently logged in account
 * @type {(dvf: ReturnType<import('../lib/dvf/bindApi')>,
 * nonce: string,
 * signature: string) => string}
 */
module.exports = async (dvf, nonce, signature) => {
  const url = '/v1/trading/storeStarkL1Registration'

  // Explicitly fetch the config to get the user's registered address
  // in the backend
  const { ethAddress } = await dvf.getUserConfigFromServer(nonce, signature)

  const l1RegistrationSignature = await dvf.stark.signRegistration(
    ethAddress
  )

  const data = {
    l1RegistrationSignature
  }

  return dvf.postAuthenticated(url, nonce, signature, data)
}
