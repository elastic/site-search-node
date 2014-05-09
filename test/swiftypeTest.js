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
      var engine = 'my-engine'
      client.engines.get({engine: engine}, function(err, res) {
        assert(res)
        assert.equal(engine, res.slug)
        done()
      })
    })
  })

  describe('documentTypes', function() {
    var apiKey = 'a-test-api-key',
        client = new Swiftype({apiKey: apiKey}),
        engine = 'my-engine'

    it('gets the document types for an engine', function(done) {
      client.documentTypes.getAll({engine: engine}, function(err, res) {
        assert(res)
        assert.equal(1, res.length)
        done()
      })
    })

    it('gets the document type', function(done) {
      var documentType = 'books'
      client.documentTypes.get({engine: engine, documentType: documentType}, function(err, res) {
        assert(res)
        assert.equal(documentType, res.slug)
        done()
      })
    })
  })

  describe('search', function() {
    var apiKey = 'a-test-api-key',
      client = new Swiftype({apiKey: apiKey}),
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
