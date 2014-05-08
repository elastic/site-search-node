'use strict'

var Engines = function(client) {
  this.client = client
}

Engines.prototype = {
  
  getAll: function(callback) {
    this.client.get('/engines.json', callback)
  },

  get: function(engineId, callback) {
    this.client.get('/engines/' + engineId + '.json', callback)
  }
}

module.exports = Engines
