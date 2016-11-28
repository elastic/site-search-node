var assert = require('assert'),
    Swiftype = require('../lib/swiftype'),
    replay = require('replay')

// Engines and keys fixtures
var myEngine = process.env.SWIFTYPE_TEST_MY_ENGINE || 'my-engine',
    bookstoreEngine = process.env.SWIFTYPE_TEST_BOOKSTORE_ENGINE || 'bookstore',
    temporaryEngine = process.env.SWIFTYPE_TEST_TEMPORARY_ENGINE || 'temporary',
    apiKey = process.env.SWIFTYPE_TEST_API_KEY || 'a-test-api-key'

describe('documentTypes', function() {
  var client = new Swiftype({ apiKey: apiKey })

  it('gets the document types for an engine', function(done) {
    client.documentTypes.list({engine: bookstoreEngine}, function(err, res) {
      assert(res)
      assert.equal(2, res.length)
      done()
    })
  })

  it('gets the document type', function(done) {
    var documentType = 'books'
    client.documentTypes.get({engine: bookstoreEngine, documentType: documentType}, function(err, res) {
      assert(res)
      assert.equal(documentType, res.slug)
      done()
    })
  })

  it('creates a document type', function(done) {
    var documentType = { name: 'magazines' }
    client.documentTypes.create({engine: bookstoreEngine, document_type: documentType}, function(err, res) {
      assert(res)
      assert.equal(documentType.name, res.name)
      done()
    })
  })

  it('searches document types', function(done) {
    var documentType = 'books'
    client.documentTypes.search({
      engine: bookstoreEngine,
      documentType: documentType,
      q: 'Gatsby'
    }, function(err, res) {
      assert(res)
      assert.equal(res.record_count, 0);
      done()
    })
  })

  it('destroys a document type', function(done) {
    var documentType = 'magazines'
    client.documentTypes.destroy({
      engine: bookstoreEngine,
      documentType: documentType
    }, function(err, res) {
      assert(res)
      assert.equal(204, res.statusCode)
      done()
    })
  })
})
