'use strict';

var DocumentTypes = function(client) {
  this.client = client
}

DocumentTypes.prototype = {
  
  list: function(params, callback) {
    this.client.get('/engines/{engine}/document_types.json', params, callback)
  },

  get: function(params, callback) {
    this.client.get('/engines/{engine}/document_types/{documentType}.json', params, callback)
  },

  create: function(params, callback) {
    this.client.post('/engines/{engine}/document_types.json', params, callback)
  },

  search: function(params, callback) {
    this.client.get('/engines/{engine}/document_types/{documentType}/search.json', params, callback)
  },

  destroy: function(params, callback) {
    this.client.delete('/engines/{engine}/document_types/{documentType}', params, callback)
  }
}

module.exports = DocumentTypes
