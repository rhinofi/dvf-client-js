const nock = require('nock')

module.exports = () => {
  const apiResponse = {
    DVF: {
      exchangeSymbols: ['tETHUSD', 'tZRXUSD', 'tZRXETH'],
      exchangeAddress: '0xBd25cD867C304F079E696CBE44D958f3d3B683ba',
      starkExContractAddress: '0x82Bd229Eb77F60f126244c87D15171696e1b37cE',
      tempStarkVaultId: 1,
      depositExpiry: 720,
      depositNonce: 1
    },
    tokenRegistry: {
      ETH: {
        decimals: 18,
        minOrderSize: 0.1,
        starkTokenId: '0x1',
        starkVaultId: 1000001
      },
      USDT: {
        decimals: 6,
        minOrderSize: 25,
        settleSpread: -0.026,
        starkTokenId: '0x2',
        tokenAddress: '0x4c5f66596197a86fb30a2435e2ef4ddcb39342c9',
        starkVaultId: 1000002
      },
      ZRX: {
        decimals: 18,
        minOrderSize: 40,
        starkTokenId: '0x3',
        tokenAddress: '0xcd077abedd831a3443ffbe24fb76661bbb17eb69',
        starkVaultId: 1000003
      },
      BTC: {
        decimals: 18,
        minOrderSize: 0.0001,
        starkTokenId: '0x4',
        tokenAddress: '0x40d8978500bf68324a51533cd6a21e3e59be324a',
        starkVaultId: 1000004
      }
    },
    spareStarkVaultId: 2090569095,
    ethAddress: '0xf858c2f2ac6b96df8c801bce90a3124a52d1915a'
  }

  nock('https://api.deversifi.dev')
    .post('/v1/trading/r/getUserConf', body => {
      return true
    })
    .reply(200, apiResponse)
}
