var assert = require('assert'),
    Swiftype = require('../lib/swiftype'),
    replay = require('replay')

describe('swiftype', function() {
  describe('config', function() {
    it('sets the API key', function() {
      var apiKey = 'a-test-api-key',
          client = new Swiftype({ apiKey: apiKey })

      assert.equal(apiKey, client.config.apiKey)
    })
  })

  describe('search', function() {
    var apiKey = 'a-test-api-key',
        client = new Swiftype({ apiKey: apiKey }),
        engine = 'my-engine'

    it('searches an engine', function(done) {
      client.search({engine: engine, q: 'awesome'}, function(err, res) {
        assert(res)
        assert.equal("Awesome Site", res.records.page[0].title)
        done()
      })
    })
  })
})
