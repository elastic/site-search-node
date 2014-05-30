# Node.js client for the Swiftype API

[![Build Status](https://travis-ci.org/swiftype/swiftype-node.svg?branch=master)](https://travis-ci.org/swiftype/swiftype-node)

NOTE: This module is still a work in progress. Basic API operations are currently supported, and we should be adding full API support shortly. Patches are welcome in the mean time!

## Installation

With npm:

    npm install swiftype

or clone locally:

    $ git clone git@github.com:swiftype/swiftype-node.git
    $ cd swiftype-node
    $ npm install

## Examples

Create a new instance of the client with your api key:

    var SwiftypeApi = require('swiftype')
    var swiftype = new SwiftypeApi({
      apiKey: 'yourApiKey'
    })

### Searching

Search for `cats` on the engine `my-engine`:

    swiftype.search({
      engine: 'my-engine',
      q: 'cats'
    }, function(err, res) {
      console.log(res)
    })

### Documents

Create a new document:

    swiftype.documents.create({
      engine: 'my-engine',
      documentType: 'books',
      document: {
        external_id: '1',
        fields: [
          { name: 'title', value: 'The Great Gatsby', type: 'string' },
          { name: 'author', value: 'F. Scott Fitzgerald', type: 'string' },
          { name: 'genre', value: 'fiction', type: 'enum' }
        ]
      }
    }, function(err, res) {
      console.log(res)
    })


### Engines

Fetch all of your engines:

    swiftype.engines.getAll(function(err, res) {
      console.log(res)
    })

Fetch a single engine:

    swiftype.engines.get({
      engine: 'my-engine'
    }, function(err, res) {
      console.log(res)
    })

### Document Types

Fetch all of the document types in the engine `my-engine`

    swiftype.documentTypes.getAll({
      engine: 'my-engine'
    }, function(err, res) {
      console.log(res)
    })

Fetch the document type `books` in the engine `my-engine`

    swiftype.documentTypes.get({
      engine: 'my-engine', 
      documentType: 'books'
    }, function(err, res) {
      console.log(res)
    })

Check out the tests for more examples!

## Tests

    $ npm test

The tests use stubbed HTTP interactions that are recorded with the [node-replay](https://github.com/assaf/node-replay) module. By default, HTTP interactions are not allowed when running the tests.
