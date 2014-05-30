'use strict';

var Client        = require('./client'),
    Engines       = require('./engines'),
    DocumentTypes = require('./documentTypes'),
    Documents     = require('./documents')

var Swiftype = function(config) {
  this.config = {
    scheme: config.scheme || 'https',
    host: config.host || 'api.swiftype.com',
    basePath: '/api/v1',
    apiKey: config.apiKey,
  }

  this.client = new Client(this.config)
  this.engines = new Engines(this.client)
  this.documentTypes = new DocumentTypes(this.client)
  this.documents = new Documents(this.client)
}

Swiftype.prototype = {

  search: function(params, callback) {
    this.client.get('/engines/{engine}/search.json', params, callback)
  }
}

module.exports = Swiftype
