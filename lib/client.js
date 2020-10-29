'use strict';

var request = require('request'),
    url     = require('url'),
    packageJson = require('../package.json')

var Client = function(config) {
  this.config = config
  this.clientName = 'elastic-site-search-node'
  this.clientVersion = packageJson.version
  this.baseUrl = url.format({ protocol: config.protocol, host: config.host, pathname: config.basePath })
}

Client.prototype = {
  get: function(path, params, callback) {
    var uri = this._buildUriComponents(path, params)

    return new Promise(function(resolve, reject) {
      request({
        method: 'GET',
        qs: uri.params,
        url: this.baseUrl + uri.path,
        auth: {
          user: this.config.apiKey
        },
        headers: {
          'X-Swiftype-Client': this.clientName,
          'X-Swiftype-Client-Version': this.clientVersion
        }
      }, function (error, response, body) {
        if (error) {
          if (callback) {
            callback(error);
          }
          else {
            reject(error);
          }
        }
        else if (!( response.statusCode.toString().match(/2[\d]{2}/) )) {
          if (callback) {
            callback(JSON.parse(response.body))
          }
          else {
            resolve(JSON.parse(response.body));
          }
        }
        else {
          if (callback) {
            callback(null, JSON.parse(response.body))
          }
          else {
            resolve(null, JSON.parse(response.body));
          }
        }
      });
    });
  },

  post: async function(path, params, callback) {
    var uri = this._buildUriComponents(path, params)

    return new Promise(function(resolve, reject)
    {
      request({
        method: 'POST',
        json: uri.params,
        url: this.baseUrl + uri.path,
        auth: {
          user: this.config.apiKey
        },
        headers: {
          'X-Swiftype-Client': this.clientName,
          'X-Swiftype-Client-Version': this.clientVersion
        }
      }, function (error, response, body) {
        if (error) {
          if (callback) {
            callback(error);
          }
          else {
            reject(error);
          }
        }
        else if (!( response.statusCode.toString().match(/2[\d]{2}/) )) {
          if (callback) {
            callback(response.body);
          }
          else {
            resolve(response.body);
          }
        }
        else {
          if (callback) {
            callback(null, response.body);
          }
          else {
            resolve(null, response.body);
          }
        }
      });
    });
  },

  put: function(path, params, callback) {
    var uri = this._buildUriComponents(path, params)

    return new Promise(function(resolve, reject) {
      request({
        method: 'PUT',
        json: uri.params,
        url: this.baseUrl + uri.path,
        auth: {
          user: this.config.apiKey
        },
        headers: {
          'X-Swiftype-Client': this.clientName,
          'X-Swiftype-Client-Version': this.clientVersion
        }
      }, function (error, response, body) {
        if (error) {
          if (callback) {
            callback(error);
          }
          else {
            reject(error);
          }
        }
        else if (!( response.statusCode.toString().match(/2[\d]{2}/) )) {
          if (callback) {
            callback(response.body);
          }
          else {
            resolve(response.body);
          }
        }
        else {
          if (callback) {
            callback(null, response.body);
          }
          else {
            resolve(null, response.body);
          }
        }
      });
    });
  },

  delete: function(path, params, callback) {
    var uri = this._buildUriComponents(path, params)

    return new Promise(function(resolve, reject) {
      request({
        method: 'DELETE',
        url: this.baseUrl + uri.path,
        auth: {
          user: this.config.apiKey
        },
        headers: {
          'Accept': '*/*',
          'X-Swiftype-Client': this.clientName,
          'X-Swiftype-Client-Version': this.clientVersion
        }
      }, function (error, response, body) {
        if (error) {
          if (callback) {
            callback(error);
          }
          else {
            reject(error);
          }
        }
        else if (!( response.statusCode.toString().match(/2[\d]{2}/) )) {
          if (callback) {
            callback(response);
          }
          else {
            resolve(response);
          }
        }
        else {
          if (callback) {
            callback(null, response);
          }
          else {
            resolve(null, response);
          }
        }
      });
    });
  },

  _serializeParams: function(obj, prefix) {
    var str = [],
      isArray = Array.isArray(obj);

    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = "",
          v = obj[p];

        if (prefix) {
          k += prefix;
          k += "[";
          if (!isArray) {
            k += p;
          }
          k += "]";
        } else {
          k = p;
        }

        str.push(typeof v == "object" ? this._serializeParams(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
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
