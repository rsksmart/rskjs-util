var assert = require('assert')
var utils = require('../dist/index.js')

describe('keccak', function () {
  it('should produce a hash', function () {
    var msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    var r = 'd6c19311d63530fc619641d35f9d7dd795e79e5fa6218451e3ee7c66ec061d4c'
    var hash = utils.keccak(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('keccak without hexprefix', function () {
  it('should produce a hash', function () {
    var msg = '3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    var r = '22ae1937ff93ec72c4d46ff3e854661e3363440acd6f6e4adf8f1a8978382251'
    var hash = utils.keccak(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

var checksumAddressesId30 = [
'0x5aaEB6053f3e94c9b9a09f33669435E7ef1bEAeD',
'0xFb6916095cA1Df60bb79ce92cE3EA74c37c5d359',
'0xDBF03B407c01E7CD3cBea99509D93F8Dddc8C6FB',
'0xD1220A0Cf47c7B9BE7a2e6ba89F429762E7B9adB'
]

var checksumAddressesId31 = [
'0x5aAeb6053F3e94c9b9A09F33669435E7EF1BEaEd',
'0xFb6916095CA1dF60bb79CE92ce3Ea74C37c5D359',
'0xdbF03B407C01E7cd3cbEa99509D93f8dDDc8C6fB',
'0xd1220a0CF47c7B9Be7A2E6Ba89f429762E7b9adB'
]

var checksumAddressesNoId = [
'0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
'0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
'0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
'0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb'
]

var invalidWithId1234 = [
'0x5aaeb6053F3E94C9B9A09f33669435E7Ef1BeAed',
'0xfb6916095ca1df60bb79Ce92ce3ea74c37c5d359',
'0xDBF03B407C01E7CD3CBEA99509D93f8DDDC8C6FB',
'0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb'
]

describe('.toChecksumAddress()', function () {
  it('Id 30', function () {
    for (var i = 0; i < checksumAddressesId30.length; i++) {
      var tmp = checksumAddressesId30[i]
      assert.equal(utils.toChecksumAddress(tmp.toLowerCase(), 30), tmp)
    }
  })
  it('Id 31', function () {
    for (var i = 0; i < checksumAddressesId31.length; i++) {
      var tmp = checksumAddressesId31[i]
      assert.equal(utils.toChecksumAddress(tmp.toLowerCase(), 31), tmp)
    }
  })
  it('no Id', function () {
    for (var i = 0; i < checksumAddressesNoId.length; i++) {
      var tmp = checksumAddressesNoId[i]
      assert.equal(utils.toChecksumAddress(tmp.toLowerCase()), tmp)
    }
  })
})

describe('.isValidChecksumAddress()', function () {
  it('Valid with Id 30', function () {
    for (var i = 0; i < checksumAddressesId30.length; i++) {
      assert.ok(utils.isValidChecksumAddress(checksumAddressesId30[i], 30))
    }
  })
  it('Valid with Id 31', function () {
    for (var i = 0; i < checksumAddressesId31.length; i++) {
      assert.ok(utils.isValidChecksumAddress(checksumAddressesId31[i], 31))
    }
  })
  it('Valid with no Id', function () {
    for (var i = 0; i < checksumAddressesNoId.length; i++) {
      assert.ok(utils.isValidChecksumAddress(checksumAddressesNoId[i]))
    }
  })
  it('Invalid with Id 1234', function () {
    for (var i =  0; i < invalidWithId1234.length; i++) {
      assert.ok(!utils.isValidChecksumAddress(invalidWithId1234[i], 1234))
    }
  })
})

describe('.isValidAddress()', function () {
  it('Valid addresses', function () {
    assert.ok(utils.isValidAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6a'))
    assert.ok(utils.isValidAddress('0x52908400098527886E0F7030069857D2E4169EE7'))
  })
  it('Invalid addresses', function () {
    assert.ok(!utils.isValidAddress('2f015c60e0be116b1f0cd534704db9c92118fb6a'))
    assert.ok(!utils.isValidAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6'))
    assert.ok(!utils.isValidAddress('0x2f015c60e0be116b1f0cd534704db9c92118fbm'))
    assert.ok(!utils.isValidAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6aa'))
    assert.ok(!utils.isValidAddress('0X52908400098527886E0F7030069857D2E4169EE7'))
    assert.ok(!utils.isValidAddress('0X52908400098527886E0F7030069857D2E4169EE7'))
    assert.ok(!utils.isValidAddress('x2f015c60e0be116b1f0cd534704db9c92118fb6a'))
  })
})
