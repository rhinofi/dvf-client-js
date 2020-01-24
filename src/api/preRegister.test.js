const nock = require('nock')
const instance = require('./test/helpers/instance')

const mockGetConf = require('./test/fixtures/getConf')

const sw = require('starkware_crypto')
const _ = require('lodash')

let dvf

describe('preRegister', () => {
  beforeAll(async () => {
    mockGetConf()
    dvf = await instance()
  })

  it('Pre-registers the starkKey and ethAddress', async done => {
    const apiResponse = { register: 'success' }

    const pvtKey = '100'
    const starkKeyPair = sw.ec.keyFromPrivate(pvtKey, 'hex')
    const fullPublicKey = sw.ec.keyFromPublic(
      starkKeyPair.getPublic(true, 'hex'),
      'hex'
    )

    const starkPublicKey = {
      x: fullPublicKey.pub.getX().toString('hex'),
      y: fullPublicKey.pub.getY().toString('hex')
    }

    nock(dvf.config.api)
      .post('/v1/trading/w/preRegister', body => {
        return (
          _.isMatch(body, {
            starkKey: starkPublicKey.x
          }) && body.ethAddress
        )
      })
      .reply(200, apiResponse)

    const response = await dvf.preRegister(starkPublicKey)
    expect(response).toEqual(apiResponse)

    done()
  })

  it('Pre-register checks for stark Key', async done => {
    const preRegister = await dvf.preRegister(null)
    expect(preRegister.error).toEqual('ERR_STARK_KEY_MISSING')
    done()
  })
})
