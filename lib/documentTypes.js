'use strict'

var DocumentTypes = function(client) {
  this.client = client
}

DocumentTypes.prototype = {
  
  getAll: function(engineId, callback) {
    this.client.get('/engines/' + engineId + '/document_types.json', callback)
  },

  get: function(engineId, documentTypeId, callback) {
    this.client.get('/engines/' + engineId + '/document_types/' + documentTypeId + '.json', callback)
  }
}

module.exports = DocumentTypes
