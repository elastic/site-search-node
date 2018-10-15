'use strict';

var Analytics = function(client) {
  this.client = client
}

Analytics.prototype = {

  searches: function(params, callback) {
    if (params.documentType) {
      this.client.get('/engines/{engine}/document_types/{documentType}/analytics/searches.json', params, callback)
    } else {
      this.client.get('/engines/{engine}/analytics/searches.json', params, callback)
    }
  },

  autoselects: function(params, callback) {
    if (params.documentType) {
      this.client.get('/engines/{engine}/document_types/{documentType}/analytics/autoselects.json', params, callback)
    } else {
      this.client.get('/engines/{engine}/analytics/autoselects.json', params, callback)
    }
  },

  clicks: function(params, callback) {
    if (params.documentType) {
      this.client.get('/engines/{engine}/document_types/{documentType}/analytics/clicks.json', params, callback)
    } else {
      this.client.get('/engines/{engine}/analytics/clicks.json', params, callback)
    }
  },

  topQueries: function(params, callback) {
    this.client.get('/engines/{engine}/analytics/top_queries.json', params, callback)
  },

  topNoResultQueries: function(params, callback) {
    this.client.get('/engines/{engine}/analytics/top_no_result_queries.json', params, callback)
  },

  logClickthrough: function(params, callback) {
    this.client.post('/engines/{engine}/document_types/{documentType}/analytics/log_clickthrough.json', params, callback)
  }
}

module.exports = Analytics
