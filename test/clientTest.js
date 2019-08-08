var assert = require('assert'),
    SiteSearchClient = require('../lib/siteSearch'),
    replay = require('replay')

// Engines and keys fixtures
var myEngine = process.env.SITE_SEARCH_TEST_MY_ENGINE || 'my-engine',
    bookstoreEngine = process.env.SITE_SEARCH_TEST_BOOKSTORE_ENGINE || 'bookstore',
    temporaryEngine = process.env.SITE_SEARCH_TEST_TEMPORARY_ENGINE || 'temporary',
    apiKey = process.env.SITE_SEARCH_TEST_API_KEY || 'a-test-api-key'

describe('client', function() {
  it('encodes parameters', function() {
    var siteSearchClient = new SiteSearchClient({ apiKey: apiKey })

    assert.equal('foo%5B%5D=1&foo%5B%5D=2&bar%5Bbaz%5D%5B%5D=a&bar%5Bbaz%5D%5B%5D=b', siteSearchClient.client._serializeParams({foo: [1, 2], bar: {baz: ['a', 'b']}}))
  })
})
