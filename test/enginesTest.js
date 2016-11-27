var assert = require('assert'),
    Swiftype = require('../lib/swiftype'),
    replay = require('replay')

// Engines and keys
var myEngine = process.env.SWIFTYPE_TEST_MY_ENGINE || 'my-engine',
    bookstoreEngine = process.env.SWIFTYPE_TEST_BOOKSTORE_ENGINE || 'bookstore',
    apiKey = process.env.SWIFTYPE_TEST_API_KEY || 'a-test-api-key'

describe('engines', function() {
  var client = new Swiftype({ apiKey: apiKey })

  it('gets the engines', function(done) {
    client.engines.list(function(err, res) {
      assert(res)
      assert.equal(2, res.length)
      done()
    })
  })

  it('gets an engine', function(done) {
    var engine = 'my-engine'
    client.engines.get({engine: myEngine}, function(err, res) {
      assert(res)
      assert.equal(myEngine, res.slug)
      done()
    })
  })

  it('creates an engine', function(done) {
    var engine = { name: 'temporary' }
    client.engines.create({engine: engine}, function(err, res) {
      assert(res)
      assert.equal(engine.name, res.name)
      done()
    })
  })

  it('destroys an engine', function(done) {
    client.engines.destroy({
      engine: bookstoreEngine
    }, function(err, res) {
      assert(res)
      assert.equal(204, res.statusCode)
      done()
    })
  })
})
