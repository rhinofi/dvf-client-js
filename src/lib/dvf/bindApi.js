/**
 * - Creates an dvf instance
 * - Load all functions from the ./api folder into this instance
 * - Binds the functions so they will always receive dvf as first argument
 *
 * This way we get a regular looking API on top of functional code
 */
const _ = require('lodash')

module.exports = () => {
  const dvf = {}

  // returns a function that will call api functions prepending dvf
  // as first argument
  const compose = funk => {
    return _.partial(funk, dvf)
  }

  // dvf.account functions
  dvf.account = {
    balance: compose(require('../../api/account/balance')),
    tokenBalance: compose(require('../../api/account/tokenBalance')),
    select: compose(require('../../api/account/select'))
  }

  dvf.stark = {
    createStarkOrder: compose(require('../../api/stark/createStarkOrder')),
    createOrderMessage: require('../../api/stark/createOrderMessage'),
    sign: require('../../api/stark/starkSign'),
    createTransferMsg: require('../../api/stark/createTransferMessage'),
    createPrivateKey: require('../../api/stark/createPrivateKey'),
    createStarkKeyPair: require('../../api/stark/createStarkKeyPair'),
    register: require('../../api/contract/register'),
    createRawStarkKeyPair: require('../../api/stark/createRawStarkKeyPair')
  }
  // dvf.contract functions
  dvf.contract = {
    approve: compose(require('../../api/contract/approve')),
    isApproved: compose(require('../../api/contract/isApproved')),
    deposit: compose(require('../../api/contract/deposit')),
    abi: {
      token: require('../../api/contract/abi/token.abi'),
      StarkEx: require('../../api/contract/abi/StarkEx.abi')
    }
  }

  // dvf.eth functions
  dvf.eth = {
    call: compose(require('../../api/eth/call')),
    send: compose(require('../../api/eth/send')),
    getNetwork: compose(require('../../api/eth/getNetwork'))
  }

  // dvf.sign functions
  dvf.sign = compose(require('../../api/sign/sign'))
  dvf.sign.cancelOrder = compose(require('../../api/sign/cancelOrder'))
  dvf.sign.request = compose(require('../../api/sign/request'))

  // dvf main functions
  dvf.getConfig = compose(require('../../api/getConfig'))
  dvf.getUserConfig = compose(require('../../api/getUserConfig'))
  dvf.cancelOrder = compose(require('../../api/cancelOrder'))
  dvf.deposit = compose(require('../../api/deposit'))
  dvf.getBalance = compose(require('../../api/getBalance'))
  dvf.getFeeRate = compose(require('../../api/getFeeRate'))
  dvf.getOrder = compose(require('../../api/getOrder'))
  dvf.getOrdersHist = compose(require('../../api/getOrdersHist'))
  dvf.getOrders = compose(require('../../api/getOrders'))
  dvf.register = compose(require('../../api/register'))
  dvf.submitBuyOrder = compose(require('../../api/submitBuyOrder'))
  dvf.submitOrder = compose(require('../../api/submitOrder'))
  dvf.submitSellOrder = compose(require('../../api/submitSellOrder'))
  dvf.preRegister = compose(require('../../api/preRegister'))

  return dvf
}
