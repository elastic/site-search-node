'use strict';

var Client        = require('./client'),
    Engines       = require('./engines'),
    DocumentTypes = require('./documentTypes'),
    Documents     = require('./documents'),
    Analytics     = require('./analytics')

var SiteSearchClient = function(config) {
  this.config = {
    protocol: config.protocol || 'https',
    host: config.host || 'api.swiftype.com',
    basePath: '/api/v1',
    apiKey: config.apiKey,
  }

  this.client = new Client(this.config)
  this.engines = new Engines(this.client)
  this.documentTypes = new DocumentTypes(this.client)
  this.documents = new Documents(this.client)
  this.analytics = new Analytics(this.client)
}

SiteSearchClient.prototype = {
  search: function(params, callback) {
    this.client.post('/engines/{engine}/search.json', params, callback)
  },

  suggest: function(params, callback) {
    this.client.post('/engines/{engine}/suggest.json', params, callback)
  },

  click: function(params, callback) {
    this.analytics.logClickthrough(params, callback)
  }
}

module.exports = SiteSearchClient
