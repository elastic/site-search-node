'use strict'

var DocumentTypes = function(client) {
  this.client = client
}

DocumentTypes.prototype = {
  
  getAll: function(params, callback) {
    this.client.get('/engines/{engine}/document_types.json', params, callback)
  },

  get: function(params, callback) {
    this.client.get('/engines/{engine}/document_types/{documentType}.json', params, callback)
  }
}

module.exports = DocumentTypes
