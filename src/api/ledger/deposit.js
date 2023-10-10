const post = require('../../lib/dvf/post-generic')
const validateAssertions = require('../../lib/validators/validateAssertions')

module.exports = async (dvf, token, amount, path, nonce, signature) => {
  validateAssertions(dvf, {amount, token})
  const tempVaultId = dvf.config.DVF.tempStarkVaultId || '1'
  const depositAmount = dvf.util.prepareDepositAmount(amount, token)
  const starkDeposit = await dvf.stark.ledger.createDepositData(path, token, depositAmount, tempVaultId, nonce, signature)

  const data = {
    token,
    amount: depositAmount,
    nonce: starkDeposit.nonce,
    expireTime: starkDeposit.expireTime,
    starkVaultId: starkDeposit.starkVaultId,
    starkSignature: starkDeposit.starkSignature,
    starkPublicKey: starkDeposit.starkPublicKey
  }

  const url = '/v1/trading/w/deposit'

  const deposit = await post(dvf, url, data)
  const ctDeposit = await dvf.contract.deposit(tempVaultId, token, amount, `0x${starkDeposit.starkPublicKey.x}`)

  return {...deposit, ...ctDeposit}
}
