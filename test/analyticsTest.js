var assert = require('assert'),
    Swiftype = require('../lib/swiftype'),
    replay = require('replay')

// Engines and keys
var myEngine = process.env.SWIFTYPE_TEST_MY_ENGINE || 'my-engine',
    bookstoreEngine = process.env.SWIFTYPE_TEST_BOOKSTORE_ENGINE || 'bookstore',
    apiKey = process.env.SWIFTYPE_TEST_API_KEY || 'a-test-api-key'

describe('analytics', function() {
  var client = new Swiftype({ apiKey: apiKey }),
      documentType = 'videos'

  it('gets engine-wide analytics', function(done) {
    client.analytics.searches({
      engine: bookstoreEngine
    }, function(err, res) {
      assert(res)
      assert.equal(15, res.length)
      assert.deepEqual(['2016-11-27', 0], res[0])
      done()
    })
  })

  it('gets engine-wide analytics for a time range', function(done) {
    client.analytics.searches({
      engine: bookstoreEngine,
      start_date: '2014-06-12',
      end_date: '2014-06-18'
    }, function(err, res) {
      assert(res)
      assert.deepEqual(['2014-06-18', 0], res[0])
      assert.equal(7, res.length)
      done()
    })
  })

  it('gets document-type analytics', function(done) {
    client.analytics.searches({
      engine: bookstoreEngine,
      documentType: documentType
    }, function(err, res) {
      assert(res)
      assert.deepEqual(['2016-11-27', 0], res[0])
      assert.equal(15, res.length)
      done()
    })
  })

  it('gets document type analytics for a time range', function(done) {
    client.analytics.searches({
      engine: bookstoreEngine,
      documentType: documentType,
      start_date: '2014-06-12',
      end_date: '2014-06-18'
    }, function(err, res) {
      assert(res)
      assert.deepEqual(['2014-06-18', 0], res[0])
      assert.equal(7, res.length)
      done()
    })
  })

  it('gets engine-wide autoselects for the default time range', function(done) {
    client.analytics.autoselects({
      engine: bookstoreEngine
    }, function(err, res) {
      assert(res)
      assert.equal(15, res.length)
      assert.deepEqual(['2016-11-27', 0], res[0])
      done()
    })
  })

  it('gets engine-wide autoselects for a time range', function(done) {
    client.analytics.autoselects({
      engine: bookstoreEngine,
      start_date: '2014-06-12',
      end_date: '2014-06-18'
    }, function(err, res) {
      assert(res)
      assert.equal(7, res.length)
      assert.deepEqual(['2014-06-18', 0], res[0])
      done()
    })
  })

  it('gets document type autoselects for the default time range', function(done) {
    client.analytics.autoselects({
      engine: bookstoreEngine,
      documentType: documentType
    }, function(err, res) {
      assert(res)
      assert.equal(15, res.length)
      assert.deepEqual(['2016-11-27', 0], res[0])
      done()
    })
  })

  it('gets document type autoselects for a time range', function(done) {
    client.analytics.autoselects({
      engine: bookstoreEngine,
      documentType: documentType,
      start_date: '2014-06-12',
      end_date: '2014-06-18'
    }, function(err, res) {
      assert(res)
      assert.equal(7, res.length)
      assert.deepEqual(['2014-06-18', 0], res[0])
      done()
    })
  })

  it('gets engine-wide clicks for the default time range', function(done) {
    client.analytics.clicks({
      engine: bookstoreEngine
    }, function(err, res) {
      assert(res)
      assert.equal(15, res.length)
      assert.deepEqual(['2016-11-27', 0], res[0])
      done()
    })
  })

  it('gets engine-wide clicks for a time range', function(done) {
    client.analytics.clicks({
      engine: bookstoreEngine,
      start_date: '2014-06-12',
      end_date: '2014-06-18'
    }, function(err, res) {
      assert(res)
      assert.equal(7, res.length)
      assert.deepEqual(['2014-06-18', 0], res[0])
      done()
    })
  })

  it('gets document type clicks for the default time range', function(done) {
    client.analytics.clicks({
      engine: bookstoreEngine,
      documentType: documentType
    }, function(err, res) {
      assert(res)
      assert.equal(15, res.length)
      assert.deepEqual(['2016-11-27', 0], res[0])
      done()
    })
  })

  it('gets document type clicks for a time range', function(done) {
    client.analytics.clicks({
      engine: bookstoreEngine,
      documentType: documentType,
      start_date: '2014-06-12',
      end_date: '2014-06-18'
    }, function(err, res) {
      assert(res)
      assert.equal(7, res.length)
      assert.deepEqual(['2014-06-18', 0], res[0])
      done()
    })
  })

  it('gets top queries', function(done) {
    client.analytics.topQueries({
      engine: bookstoreEngine
    }, function(err, res) {
      assert(res)
      assert.equal(0, res.length)
      done()
    })
  })

  it('gets top no result queries', function(done) {
    client.analytics.topNoResultQueries({
      engine: bookstoreEngine
    }, function(err, res) {
      assert(res)
      assert.equal(0, res.length)
      done()
    })
  })
})