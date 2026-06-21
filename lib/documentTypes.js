'use strict';

var DocumentTypes = function(client) {
  this.client = client;
}

DocumentTypes.prototype = {
  list: function(params, callback) {
    this.client.get('/engines/{engine}/document_types.json', params, callback);
  },

  listAsync: async function(params) {
    return await this.client.get('/engines/{engine}/document_types.json', params);
  },

  get: function(params, callback) {
    this.client.get('/engines/{engine}/document_types/{documentType}.json', params, callback);
  },

  getAsync: async function(params) {
    return await this.client.get('/engines/{engine}/document_types/{documentType}.json', params);
  },

  create: function(params, callback) {
    this.client.post('/engines/{engine}/document_types.json', params, callback);
  },

  createAsync: async function(params) {
    return await this.client.post('/engines/{engine}/document_types.json', params);
  },

  search: function(params, callback) {
    this.client.get('/engines/{engine}/document_types/{documentType}/search.json', params, callback);
  },

  searchAsync: async function(params) {
    return await this.client.get('/engines/{engine}/document_types/{documentType}/search.json', params);
  },

  destroy: function(params, callback) {
    this.client.delete('/engines/{engine}/document_types/{documentType}', params, callback);
  },

  destroyAsync: async function(params) {
    return await this.client.delete('/engines/{engine}/document_types/{documentType}', params);
  }
}

module.exports = DocumentTypes
