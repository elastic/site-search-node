'use strict'

var Client        = require('./client'),
    Engines       = require('./engines'),
    DocumentTypes = require('./documentTypes')

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
}

module.exports = Swiftype
