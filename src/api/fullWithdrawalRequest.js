const DVFError = require('../lib/dvf/DVFError')
const validateAssertions = require('../lib/validators/validateAssertions')

module.exports = async (dvf, token, starkKey) => {
  validateAssertions(dvf, { token })

  const { status, transactionHash } = await dvf.contract.fullWithdrawalRequest(token, starkKey)

  if (!status) {
    throw new DVFError('ERR_CALLING_FULL_WITHDRAWAL_REQUEST')
  }
  return { transactionHash }
}
