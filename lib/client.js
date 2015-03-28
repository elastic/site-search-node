'use strict';

var request = require('request'),
    url     = require('url')

var Client = function(config) {
  this.config = config
  this.userAgent = 'Swiftype-Node/' + require('../package.json').version
  this.baseUrl = url.format({ protocol: config.protocol, host: config.host, pathname: config.basePath })
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
      },
      headers: {
        'User-Agent': this.userAgent
      }
    }, function(error, response, body) {
      if (error)
        return callback(error)
      else if (!(response.statusCode.toString().match(/2[\d]{2}/)))
        return callback(SON.parse(response.body))
      else
        return callback(null, JSON.parse(response.body))
    })
  },

  post: function(path, params, callback) {
    var uri = this._buildUriComponents(path, params)

    request({
      method: 'POST',
      json: uri.params,
      url: this.baseUrl + uri.path,
      auth: {
        user: this.config.apiKey
      },
      headers: {
        'User-Agent': this.userAgent
      }
    }, function(error, response, body) {
      if (error)
        return callback(error)
      else if (!(response.statusCode.toString().match(/2[\d]{2}/)))
        return callback(response.body)
      else
        return callback(null, response.body)
    })
  },

  put: function(path, params, callback) {
    var uri = this._buildUriComponents(path, params)

    request({
      method: 'PUT',
      json: uri.params,
      url: this.baseUrl + uri.path,
      auth: {
        user: this.config.apiKey
      },
      headers: {
        'User-Agent': this.userAgent
      }
    }, function(error, response, body) {
      if (error)
        return callback(error)
      else if (!(response.statusCode.toString().match(/2[\d]{2}/)))
        return callback(response.body)
      else
        return callback(null, response.body)
    })
  },

  delete: function(path, params, callback) {
    var uri = this._buildUriComponents(path, params)

    request({
      method: 'DELETE',
      url: this.baseUrl + uri.path,
      auth: {
        user: this.config.apiKey
      },
      headers: {
        'Accept': '*/*',
        'User-Agent': this.userAgent
      }
    }, function(error, response, body) {
      if (error)
        return callback(error)
      else if (!(response.statusCode.toString().match(/2[\d]{2}/)))
        return callback(response)
      else
        return callback(null, response)
    })
  },

  /*
    Parses a path string, replacing '{property}' tags with the
    corresponding value from the params object and removes those
    properties from the params object.

      > var path = '/engines/{engine}/document_types/{documentType}.json'
      > var params = { engine: 'foo', documentType: 'bar', another: 'param' }
      > this._buildUri(path, params)
        { path: '/engines/foo/document_types/bar.json, params: { another: 'param' } }
  */
  _buildUriComponents: function(path, params) {
    path = path.replace(/{([^{}]*)}/g, function(tag, property) {
      var param = params[property]
      delete params[property]
      return param
    })

    return { path: path, params: params }
  }

}

module.exports = Client
