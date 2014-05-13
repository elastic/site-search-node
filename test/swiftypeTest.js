var assert = require('assert'),
    Swiftype = require('../lib/swiftype'),
    replay = require("replay")

describe('swiftype', function() {
  describe('config', function() {
    it('sets the API key', function() {
      var apiKey = 'a-test-api-key',
          client = new Swiftype({ apiKey: apiKey })

      assert.equal(apiKey, client.config.apiKey)
    })
  })

  describe('engines', function() {
    var apiKey = 'a-test-api-key',
        client = new Swiftype({ apiKey: apiKey })

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

    it('creates an engine', function(done) {
      var engine = { name: 'bookstore' }
      client.engines.create({engine: engine}, function(err, res) {
        assert(res)
        assert.equal(engine.name, res.name)
        done()
      })
    })
  })

  describe('documentTypes', function() {
    var apiKey = 'a-test-api-key',
        client = new Swiftype({ apiKey: apiKey }),
        engine = 'bookstore'

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

    it('creates a document type', function(done) {
      var documentType = { name: 'books' }
      client.documentTypes.create({engine: engine, document_type: documentType}, function(err, res) {
        assert(res)
        assert.equal(documentType.name, res.name)
        done()
      })
    })

    it('searches document types', function(done) {
      var documentType = 'books'
      client.documentTypes.search({
        engine: engine,
        documentType: documentType,
        q: 'Gatsby'
      }, function(err, res) {
        assert(res)
        assert.equal('The Great Gatsby', res.records.books[0].title)
        done()
      })
    })
  })

  describe('documents', function() {
    var apiKey = 'a-test-api-key',
        client = new Swiftype({ apiKey: apiKey }),
        engine = 'bookstore',
        documentType = 'books'

    it('creates a document', function(done) {
      var document = {
        external_id: '1',
        fields: [
          { name: "title", value: "The Great Gatsby", type: "string" },
          { name: "author", value: "F. Scott Fitzgerald", type: "string" },
          { name: "genre", value: "fiction", type: "enum" }
        ]
      }

      client.documents.create({
        engine: engine,
        documentType: documentType,
        document: document
      }, function(err, res) {
        assert(res)
        assert.equal(document.external_id, res.external_id)
        done()
      })
    })

    it('gets a document', function(done) {
      client.documents.get({
        engine: engine,
        documentType: documentType,
        externalId: '1'
      }, function(err, res) {
        assert(res)
        assert.equal('The Great Gatsby', res.title)
        done()
      })
    })

    it('gets all the documents', function(done) {
      client.documents.getAll({
        engine: engine,
        documentType: documentType
      }, function(err, res) {
        assert(res)
        assert.equal(1, res.length)
        done()
      })
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
