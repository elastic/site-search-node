var assert = require('assert'),
    Swiftype = require('../lib/swiftype'),
    replay = require('replay')

describe('analytics', function() {
  var apiKey = 'a-test-api-key',
      client = new Swiftype({ apiKey: apiKey }),
      engine = 'swiftype-api-example',
      documentType = 'videos'

  it('gets engine-wide analytics', function(done) {
    client.analytics.searches({
      engine: engine
    }, function(err, res) {
      assert(res)
      assert.equal(15, res.length)
      assert.deepEqual(['2014-06-18', 0], res[0])
      done()
    })
  })

  it('gets engine-wide analytics for a time range', function(done) {
    client.analytics.searches({
      engine: engine,
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
      engine: engine,
      documentType: documentType
    }, function(err, res) {
      assert(res)
      assert.deepEqual(['2014-06-18', 0], res[0])
      assert.equal(15, res.length)
      done()
    })
  })

  it('gets document type analytics for a time range', function(done) {
    client.analytics.searches({
      engine: engine,
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
      engine: engine
    }, function(err, res) {
      assert(res)
      assert.equal(15, res.length)
      assert.deepEqual(['2014-06-18', 0], res[0])
      done()
    })
  })

  it('gets engine-wide autoselects for a time range', function(done) {
    client.analytics.autoselects({
      engine: engine,
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
      engine: engine,
      documentType: documentType
    }, function(err, res) {
      assert(res)
      assert.equal(15, res.length)
      assert.deepEqual(['2014-06-18', 0], res[0])
      done()
    })
  })

  it('gets document type autoselects for a time range', function(done) {
    client.analytics.autoselects({
      engine: engine,
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
      engine: engine
    }, function(err, res) {
      assert(res)
      assert.equal(15, res.length)
      assert.deepEqual(['2014-06-18', 0], res[0])
      done()
    })
  })

  it('gets engine-wide clicks for a time range', function(done) {
    client.analytics.clicks({
      engine: engine,
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
      engine: engine,
      documentType: documentType
    }, function(err, res) {
      assert(res)
      assert.equal(15, res.length)
      assert.deepEqual(['2014-06-18', 0], res[0])
      done()
    })
  })

  it('gets document type clicks for a time range', function(done) {
    client.analytics.clicks({
      engine: engine,
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
      engine: engine
    }, function(err, res) {
      assert(res)
      assert.equal(20, res.length)
      assert.deepEqual(['cat', 22], res[0])
      done()
    })
  })

  it('gets top no result queries', function(done) {
    client.analytics.topNoResultQueries({
      engine: engine
    }, function(err, res) {
      assert(res)
      assert.equal(13, res.length)
      assert.deepEqual(['river', 12], res[0])
      done()
    })
  })
})