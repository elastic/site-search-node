var assert = require('assert'),
    Swiftype = require('../lib/swiftype'),
    replay = require("replay")

describe('swiftype', function() {
  describe('config', function() {
    it('sets the API key', function() {
      var apiKey = 'a-test-api-key',
          client = new Swiftype({apiKey: apiKey})

      assert.equal(apiKey, client.config.apiKey)
    })
  })

  describe('engines', function() {
    var apiKey = 'a-test-api-key',
        client = new Swiftype({apiKey: apiKey})

    it('gets the engines', function(done) {
      client.engines.getAll(function(err, res) {
        assert(res)
        assert.equal(1, res.length)
        done()
      })
    })

    it('gets an engine', function(done) {
      var slug = 'my-engine'
      client.engines.get(slug, function(err, res) {
        assert(res)
        assert.equal(slug, res.slug)
        done()
      })
    })
  })

  describe('documentTypes', function() {
    var apiKey = 'a-test-api-key',
        client = new Swiftype({apiKey: apiKey}),
        engine = 'my-engine'

    it('gets the document types for an engine', function(done) {
      client.documentTypes.getAll(engine, function(err, res) {
        assert(res)
        assert.equal(1, res.length)
        done()
      })
    })

    it('gets the document ', function(done) {
      var slug = 'books'
      client.documentTypes.get(engine, slug, function(err, res) {
        assert(res)
        assert.equal(slug, res.slug)
        done()
      })
    })
  })
})
