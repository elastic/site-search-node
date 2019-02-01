<p align="center"><img src="https://github.com/swiftype/swiftype-node/blob/master/logo-app-search.png?raw=true" alt="Elastic Site Search Logo"></p>

<p align="center"><a href="https://travis-ci.org/swiftype/swiftype-node"><img src="https://travis-ci.org/swiftype/swiftype-node.svg?branch=master" alt="Travis build"></a>
<a href="https://github.com/swiftype/swiftype-node/releases"><img src="https://img.shields.io/github/release/swiftype/swiftype-node/all.svg?style=flat-square" alt="GitHub release" /></a></p>

> A first-party Node client for the [Elastic Site Search API](https://swiftype.com/documentation/site-search/overview).

## Contents

+ [Getting started](#getting-started-)
+ [Usage](#usage)
+ [Running tests](#running-tests)
+ [FAQ](#faq-)
+ [Contribute](#contribute-)
+ [License](#license-)

***

## Getting started 🐣


With npm:

    npm install swiftype

or clone locally:

    $ git clone git@github.com:swiftype/swiftype-node.git
    $ cd swiftype-node
    $ npm install

## Usage

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

Autocomplete suggestion for `cat` on the engine `my-engine` with filters:

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

### Click

Log clickthrough for `cat` on the engine `my-engine` for the documentType `page`:

    swiftype.click({
      engine: 'my-engine',
      q: 'cat',
      id: 'the-document-id',
      documentType: 'page'
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

## Running tests

    $ npm test

The tests use stubbed HTTP interactions that are recorded with the [node-replay](https://github.com/assaf/node-replay) module. By default, HTTP interactions are not allowed when running the tests.

The tests can also use environment variables so that you can create new replays against your own account. Don't forget to change the "authorization" header in the replay files to not give away your api key.

* SWIFTYPE_TEST_MY_ENGINE = the slug for your 'my-engine' in the tests
* SWIFTYPE_TEST_BOOKSTORE_ENGINE = the slug for your 'bookstore' in the tests
* SWIFTYPE_TEST_TEMPORARY_ENGINE = the slug for your 'temporary' in the tests
* SWIFTYPE_TEST_API_KEY = your api key in the tests
* REPLAY = 'record' to record new replay files

## FAQ 🔮

### Where do I report issues with the client?

If something is not working as expected, please open an [issue](https://github.com/swiftype/swiftype-node/issues/new).

### Where can I learn more about Site Search?

Your best bet is to read the [documentation](https://swiftype.com/documentation/site-search).

### Where else can I go to get help?

You can checkout the [Elastic Site Search community discuss forums](https://discuss.elastic.co/c/site-search).

## Contribute 🚀

We welcome contributors to the project. Before you begin, a couple notes...

+ Before opening a pull request, please create an issue to [discuss the scope of your proposal](https://github.com/swiftype/swiftype-node/issues).
+ Please write simple code and concise documentation, when appropriate.

## License 📗

[MIT](https://github.com/swiftype/swiftype-node/blob/master/LICENSE) © [Elastic](https://github.com/elastic)

Thank you to all the [contributors](https://github.com/swiftype/swiftype-node/graphs/contributors)!
