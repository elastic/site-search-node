var assert = require('assert'),
    Swiftype = require('../lib/swiftype'),
    replay = require('replay')

describe('documentTypes', function() {
  var apiKey = 'a-test-api-key',
      client = new Swiftype({ apiKey: apiKey }),
      engine = 'bookstore'

  it('gets the document types for an engine', function(done) {
    client.documentTypes.list({engine: engine}, function(err, res) {
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

  it('destroys a document type', function(done) {
    var documentType = 'books'
    client.documentTypes.destroy({
      engine: engine,
      documentType: documentType
    }, function(err, res) {
      assert(res)
      assert.equal(204, res.statusCode)
      done()
    })
  })
})
