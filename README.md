# Node.js Client for Swiftype Site Search API

[![Build Status](https://travis-ci.org/swiftype/swiftype-node.svg?branch=master)](https://travis-ci.org/swiftype/swiftype-node)

> **Note:** This client has been developed for the [Swiftype Site Search](https://www.swiftype.com/site-search) API endpoints only. You may refer to the [Swiftype Site Search API Documentation](https://swiftype.com/documentation/site-search/overview) for additional context.

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

Search for `cats` on the engine `my-engine` with filters and facets:

    swiftype.search({
      engine: 'my-engine',
      q: 'cats',
      filters: {
        page: {
          'enumField': 'theFilter'
        }
      },
      facets: {
        page: ['enumField', 'anotherField']
      }
    }, function(err, res) {
      console.log(res)
    })

### Autocomplete

Autocomplete for `cat` on the engine `my-engine` with filters:

    swiftype.suggest({
      engine: 'my-engine',
      q: 'cat',
      filters: {
        page: {
          'enumField': 'theFilter'
        }
      }
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

    swiftype.engines.list(function(err, res) {
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

    swiftype.documentTypes.list({
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

The tests can also use environment variables so that you can create new replays against your own account. Don't forget to change the "authorization" header in the replay files to not give away your api key.

* SWIFTYPE_TEST_MY_ENGINE = the slug for your 'my-engine' in the tests
* SWIFTYPE_TEST_BOOKSTORE_ENGINE = the slug for your 'bookstore' in the tests
* SWIFTYPE_TEST_TEMPORARY_ENGINE = the slug for your 'temporary' in the tests
* SWIFTYPE_TEST_API_KEY = your api key in the tests
