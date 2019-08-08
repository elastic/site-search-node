var assert = require('assert'),
    SiteSearchClient = require('../lib/siteSearch'),
    replay = require('replay')

// Engines and keys fixtures
var myEngine = process.env.SITE_SEARCH_TEST_MY_ENGINE || 'my-engine',
    bookstoreEngine = process.env.SITE_SEARCH_TEST_BOOKSTORE_ENGINE || 'bookstore',
    temporaryEngine = process.env.SITE_SEARCH_TEST_TEMPORARY_ENGINE || 'temporary',
    apiKey = process.env.SITE_SEARCH_TEST_API_KEY || 'a-test-api-key'

describe('engines', function() {
  var client = new SiteSearchClient({ apiKey: apiKey })

  it('gets the engines', function(done) {
    client.engines.list(function(err, res) {
      assert(res)
      assert.equal(2, res.length)
      done()
    })
  })

  it('gets an engine', function(done) {
    client.engines.get({engine: myEngine}, function(err, res) {
      assert(res)
      assert.equal(myEngine, res.slug)
      done()
    })
  })

  it('creates an engine', function(done) {
    var engine = { name: temporaryEngine }
    client.engines.create({engine: engine}, function(err, res) {
      assert(res)
      assert.equal(engine.name, res.name)
      done()
    })
  })

  it('destroys an engine', function(done) {
    client.engines.destroy({
      engine: temporaryEngine
    }, function(err, res) {
      assert(res)
      assert.equal(204, res.statusCode)
      done()
    })
  })
})
