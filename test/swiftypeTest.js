var assert = require('assert'),
    Swiftype = require('../lib/swiftype'),
    replay = require('replay')

// Engines and keys fixtures
var myEngine = process.env.SWIFTYPE_TEST_MY_ENGINE || 'my-engine',
    bookstoreEngine = process.env.SWIFTYPE_TEST_BOOKSTORE_ENGINE || 'bookstore',
    temporaryEngine = process.env.SWIFTYPE_TEST_TEMPORARY_ENGINE || 'temporary',
    apiKey = process.env.SWIFTYPE_TEST_API_KEY || 'a-test-api-key'

describe('swiftype', function() {
  describe('config', function() {
    it('sets the API key', function() {
      var client = new Swiftype({ apiKey: apiKey })

      assert.equal(apiKey, client.config.apiKey)
    })
  })

  describe('search', function() {
    var client = new Swiftype({ apiKey: apiKey })

    it('searches an engine', function(done) {
      client.search({engine: myEngine, q: 'awesome'}, function(err, res) {
        assert(res)
        assert.equal("Asana Case Study | Swiftype", res.records.page[0].title)
        done()
      })
    })
  })

  describe('suggest', function() {
    var client = new Swiftype({ apiKey: apiKey })

    it('autocompletes on an engine', function(done) {
      client.suggest({engine: myEngine, q: 'awe'}, function(err, res) {
        assert(res)
        assert.equal("Asana Case Study | Swiftype", res.records.page[0].title)
        done()
      })
    })
  })
})
