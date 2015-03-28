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

  it('creates multiple documents in batches', function(done) {
    // node-replay doesn't nicely support mulitple requests to the same url
    // because it exports a singleton, so mutations in one test might affect other tests, so
    // this test just checks that you've correctly delegated to the documents.bulkCreate
    // https://github.com/assaf/node-replay/issues/52
    var documents = [
      {external_id: '3', fields: [ { name: 'title', value: 'A Great Book', type: 'string' } ]},
      {external_id: '4', fields: [ { name: 'title', value: 'Another Great Book', type: 'string' } ]},
    ]

    var batchSize = 1

    var passedOptions = []

    var _bulkCreate = client.documents.bulkCreate
    client.documents.bulkCreate = function(options, callback){
      assert.equal(batchSize, options.documents.length)
      passedOptions.push(options)
      callback(null, {})
    }

    var options = {
      engine: engine,
      documentType: documentType,
    }

    var batchSize = 1

    client.documents.batchCreate(options, documents, batchSize, function(err, res) {
      assert.equal(2, passedOptions.length)
      client.documents.bulkCreate = _bulkCreate
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
    client.documents.list({
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

  it('destroys multiple documents', function(done) {
    client.documents.bulkDestroy({
      engine: engine,
      documentType: documentType,
      documents: [ '3', '4' ]
    }, function(err, res) {
      assert(res)
      assert.equal(2, res.length)
      done()
    })
  })
})
