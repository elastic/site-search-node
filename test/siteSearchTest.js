var assert = require('assert'),
    SiteSearchClient = require('../lib/siteSearch'),
    replay = require('replay')

// Engines and keys fixtures
var myEngine = process.env.SITE_SEARCH_TEST_MY_ENGINE || 'my-engine',
    bookstoreEngine = process.env.SITE_SEARCH_TEST_BOOKSTORE_ENGINE || 'bookstore',
    temporaryEngine = process.env.SITE_SEARCH_TEST_TEMPORARY_ENGINE || 'temporary',
    apiKey = process.env.SITE_SEARCH_TEST_API_KEY || 'a-test-api-key'

describe('siteSearch', function() {
  describe('config', function() {
    it('sets the API key', function() {
      var client = new SiteSearchClient({ apiKey: apiKey })

      assert.equal(apiKey, client.config.apiKey)
    })
  })

  describe('search', function() {
    var client = new SiteSearchClient({ apiKey: apiKey })

    it('searches an engine', function(done) {
      client.search({engine: myEngine, q: 'awesome'}, function(err, res) {
        assert(res)
        assert.equal('Asana Case Study | Swiftype', res.records.page[0].title)
        done()
      })
    })
  })

  describe('suggest', function() {
    var client = new SiteSearchClient({ apiKey: apiKey })

    it('autocompletes on an engine', function(done) {
      client.suggest({engine: myEngine, q: 'awe'}, function(err, res) {
        assert(res)
        assert.equal('Asana Case Study | Swiftype', res.records.page[0].title)
        done()
      })
    })
  })

  describe('click', function() {
    var client = new SiteSearchClient({ apiKey: apiKey })

    it('logs the click event', function(done) {
      client.click({
        engine: myEngine,
        q: 'awesome',
        id: '5b886b63827a6656794c6eaf',
        documentType: 'page'
      }, function(err, res) {
        assert.equal(null, err)
        assert.equal(undefined, res)
        done()
      })
    })
  })
})
