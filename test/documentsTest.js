var assert = require('assert'),
    Swiftype = require('../lib/swiftype'),
    replay = require('replay')

describe('documents', function() {
  var apiKey = 'a-test-api-key',
      client = new Swiftype({ apiKey: apiKey }),
      engine = 'bookstore',
      documentType = 'books'

  it('creates a document', function(done) {
    var document = {
      external_id: '1',
      fields: [
        { name: 'title', value: 'The Great Gatsby', type: 'string' },
        { name: 'author', value: 'F. Scott Fitzgerald', type: 'string' },
        { name: 'genre', value: 'fiction', type: 'enum' }
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

  it('creates multiple documents', function(done) {
    var documents = [
      {external_id: '3', fields: [ { name: 'title', value: 'A Great Book', type: 'string' } ]},
      {external_id: '4', fields: [ { name: 'title', value: 'Another Great Book', type: 'string' } ]},
    ]

    client.documents.bulkCreate({
      engine: engine,
      documentType: documentType,
      documents: documents
    }, function(err, res) {
      assert(res)
      assert.equal(2, res.length)
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

  it('updates a document', function(done) {
    var field = { title: 'This Side of Paradise' }

    client.documents.update({
      engine: engine,
      documentType: documentType,
      externalId: '1',
      fields: field
    }, function(err, res) {
      assert(res)
      assert.equal(field.title, res.title)
      done()
    })
  })

  it('destroys a document', function(done) {
    client.documents.destroy({
      engine: engine,
      documentType: documentType,
      externalId: '1'
    }, function(err, res) {
      assert.equal(res.statusCode, 204)
      done()
    })
  })
})
