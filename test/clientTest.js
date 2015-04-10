var assert = require('assert'),
    Swiftype = require('../lib/swiftype'),
    replay = require('replay')

describe('client', function() {
  it('encodes parameters', function() {
    var apiKey = 'a-test-api-key',
        swiftype = new Swiftype({ apiKey: apiKey })

    assert.equal('foo%5B%5D=1&foo%5B%5D=2&bar%5Bbaz%5D%5B%5D=a&bar%5Bbaz%5D%5B%5D=b', swiftype.client._serializeParams({foo: [1, 2], bar: {baz: ['a', 'b']}}))
  })
})
