const FP = require('lodash/fp')
const { Joi } = require('dvf-utils')

const post = require('../lib/dvf/post-authenticated')

const validateWithJoi = require('../lib/validators/validateWithJoi')

const schema = Joi.object({
  chain: Joi.string(),
  token: Joi.string(),
  amount: Joi.amount(),
  nonce: Joi.number().integer()
    .min(0)
    // Will be auto-generated if not provided.
    .optional()
})

const validateArg0 = validateWithJoi(schema)('INVALID_METHOD_ARGUMENT')({
  context: `bridgedWithdrawal`
})

const endpoint = '/v1/trading/bridgedWithdrawals'

module.exports = async (dvf, data, authNonce, signature) => {
  const { chain, token, amount, nonce } = validateArg0(data)

  const payload = dvf.createBridgedWithdrawalPayload({ chain, token, amount, nonce }, authNonce, signature)

  // Force the use of header (instead of payload) for authentication.
  dvf = FP.set('config.useAuthHeader', true, dvf)
  return post(dvf, endpoint, authNonce, signature, payload)
}
