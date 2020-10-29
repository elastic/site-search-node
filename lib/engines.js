'use strict';

var Engines = function(client) {
  this.client = client
}

Engines.prototype = {

  list: function(callback) {
    this.client.get('/engines.json', {}, callback);
  },

  listAsync: async function() {
    return await this.client.get('/engines.json', {});
  },

  get: function(params, callback) {
    this.client.get('/engines/{engine}.json', params, callback);
  },

  getAsync: async function(params) {
    return await this.client.get('/engines/{engine}.json', params);
  },

  create: function(params, callback) {
    this.client.post('/engines.json', params, callback);
  },

  createAsync: async function(params) {
    return await this.client.post('/engines.json', params);
  },

  destroy: function(params, callback) {
    this.client.delete('/engines/{engine}', params, callback);
  },

  destroyAsync: async function(params) {
    return await this.client.delete('/engines/{engine}', params);
  }
}

module.exports = Engines
