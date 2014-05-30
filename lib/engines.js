'use strict';

var Engines = function(client) {
  this.client = client
}

Engines.prototype = {
  
  getAll: function(callback) {
    this.client.get('/engines.json', {}, callback)
  },

  get: function(params, callback) {
    this.client.get('/engines/{engine}.json', params, callback)
  },

  create: function(params, callback) {
    this.client.post('/engines.json', params, callback)
  }
}

module.exports = Engines
