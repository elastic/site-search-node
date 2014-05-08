'use strict'

var request = require('request')

var Client = function(config) {
  this.config = config
  this.baseUrl = config.scheme + '://' + config.host + config.basePath
}

Client.prototype = {
  get: function(path, callback) {
    request.get({
      url: this.baseUrl + path,
      auth: {
        user: this.config.apiKey
      }
    }, function(error, response, body) {
      if (error)
        return callback(error)
      else
        return callback(null, JSON.parse(response.body))
    })
  }
}

module.exports = Client
