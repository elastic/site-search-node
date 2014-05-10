# Node.js client for the Swiftype API

## Usage

``` javascript
var Swiftype = require('./lib/swiftype')
var client = new Swiftype({
  apiKey: 'a-test-api-key'
})

client.search({engine: 'my-engine', q: 'awesome'}, function(err, res) {
  console.log(res)
})

client.engines.getAll(function(err, res) {
  console.log(res)
})

client.engines.get({engine: 'my-engine'}, function(err, res) {
  console.log(res)
})

client.documentTypes.getAll({engine: 'my-engine'}, function(err, res) {
  console.log(res)
})

client.documentTypes.get({engine: 'my-engine', documentType: 'books'}, function(err, res) {
  console.log(res)
})
```

## Development

``` sh
  $ npm install
  $ npm test
```
