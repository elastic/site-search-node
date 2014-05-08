# Node.js client for the Swiftype API

## Usage

``` javascript
var Swiftype = require('./lib/swiftype')
var client = new Swiftype({
  apiKey: 'a-test-api-key'
})

client.engines.getAll(function(err, response) {
  console.log(response)
})

client.engines.get('my-engine', function(err, response) {
  console.log(response)
})

client.documentTypes.getAll('my-engine', function(err, response) {
  console.log(response)
})

client.documentTypes.getAll('my-engine', 'books', function(err, response) {
  console.log(response)
})
```

## Development

``` sh
  $ npm install
  $ npm test
```
