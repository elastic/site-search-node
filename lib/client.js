'use strict'

var request = require('request')

var Client = function(config) {
  this.config = config
  this.baseUrl = config.scheme + '://' + config.host + config.basePath
}

Client.prototype = {
  get: function(path, params, callback) {
    var uri = this._buildUriComponents(path, params)

    request({
      method: 'GET',
      qs: uri.params,
      url: this.baseUrl + uri.path,
      auth: {
        user: this.config.apiKey
      }
    }, function(error, response, body) {
      if (error)
        return callback(error)
      else
        return callback(null, JSON.parse(response.body))
    })
  },

  _buildUriComponents: function(path, params) {
    while (true) {
      var leftTagIndex = path.search(/{\w+/),
          rightTagIndex = path.search(/}/)

      if (leftTagIndex !== -1) {
        var token = path.substr(leftTagIndex + 1, (rightTagIndex - leftTagIndex) - 1)
        path = path.replace(/{\w+}/, params[token])
        delete params[token]
      } else {
        break
      }
    }

    return {path: path, params: params}
  }

}

module.exports = Client
