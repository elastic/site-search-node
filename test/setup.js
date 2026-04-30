'use strict';

/**
 * node-replay only patches http.request. The Site Search client uses HTTPS, so
 * requests must be routed the same way or fixtures are skipped and tests hit
 * the real API. Mirror replay's HTTP patch for https.request.
 */
require('replay');

var path = require('path');
var URL = require('url');
var HTTPS = require('https');

var replayLibDir = path.dirname(require.resolve('replay'));
var ProxyRequest = require(path.join(replayLibDir, 'proxy'));
var Replay = require('replay');

HTTPS.request = function patchedHttpsRequest(options, callback) {
  if (typeof options === 'string' || options instanceof String) {
    options = URL.parse(options);
  }
  if (options.headers && options.headers.Upgrade === 'websocket') {
    return new HTTPS.ClientRequest(options, callback);
  }
  var hostname = options.hostname || options.host && options.host.split(':')[0] || 'localhost';
  if (Replay.isLocalhost(hostname) || Replay.isPassThrough(hostname)) {
    return new HTTPS.ClientRequest(options, callback);
  }
  var request = new ProxyRequest(options, Replay.chain.start);
  if (callback) {
    request.once('response', callback);
  }
  return request;
};
