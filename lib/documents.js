'use strict';

var async = require('async')

var Documents = function(client) {
  this.client = client
}

Documents.prototype = {

  list: function(params, callback) {
    this.client.get('/engines/{engine}/document_types/{documentType}/documents.json', params, callback)
  },

  get: function(params, callback) {
    this.client.get('/engines/{engine}/document_types/{documentType}/documents/{externalId}.json', params, callback)
  },

  create: function(params, callback) {
    this.client.post('/engines/{engine}/document_types/{documentType}/documents/create_or_update.json', params, callback)
  },

  bulkCreate: function(params, callback) {
    this.client.post('/engines/{engine}/document_types/{documentType}/documents/bulk_create_or_update.json', params, callback)
  },

  batchCreate: function(params, documents, batchSize, doneCallback){
    if (!batchSize) {
      doneCallback = batchSize
      batchSize = 10
    }

    var tasks = []
    while(documents.length) {
      var batch = {
        engine: params.engine,
        documentType: params.documentType,
        documents: documents.splice(0, batchSize)
      };

      var _this = this
      tasks.push(function(callback){
        _this.bulkCreate(batch, callback)
      })
    }

    async.parallel(tasks, doneCallback);
  },

  update: function(params, callback) {
    this.client.put('/engines/{engine}/document_types/{documentType}/documents/{externalId}/update_fields.json', params, callback)
  },

  destroy: function(params, callback) {
    this.client.delete('/engines/{engine}/document_types/{documentType}/documents/{externalId}', params, callback)
  },

  bulkDestroy: function(params, callback) {
    this.client.post('/engines/{engine}/document_types/{documentType}/documents/bulk_destroy.json', params, callback)
  }
}

module.exports = Documents
