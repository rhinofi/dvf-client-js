const errorReasons = require('../error/reasons')

module.exports = (efx, token) => {
  if (!token) {
    return {
      error: 'ERR_TOKEN_MISSING',
      reason: errorReasons.ERR_TOKEN_MISSING
    }
  }
  if (!efx.config.tokenRegistry[token]) {
    return {
      error: 'ERR_INVALID_TOKEN',
      reason: errorReasons.ERR_INVALID_TOKEN
    }
  }
}
