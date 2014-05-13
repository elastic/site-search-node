'use strict'

var Documents = function(client) {
  this.client = client
}

Documents.prototype = {
  
  getAll: function(params, callback) {
    this.client.get('/engines/{engine}/document_types/{documentType}/documents.json', params, callback)
  },

  get: function(params, callback) {
    this.client.get('/engines/{engine}/document_types/{documentType}/documents/{externalId}.json', params, callback)
  },

  create: function(params, callback) {
    this.client.post('/engines/{engine}/document_types/{documentType}/documents/create_or_update.json', params, callback)
  }
}

module.exports = Documents
