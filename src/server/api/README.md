# API

## REST-compliant Routing

`/api/<collection>`

- GET: find all documents
- POST: create a new document

`/api/<collection>/:id`

- GET: find document by _id_
- PUT: update document by _id_
- DELETE: delete document by _id_

## Dependency/implementation waterfall

```text
collection/                  * The collection directory.
│
└─ interface                 * The interface(s)/contract(s) for the collection.
   │                           Interfaces are used to implement collection objects.
   │
   ├─ entity                 * The Entity/Collection classes for the collection.
   │                           These classes encapsulate collection objects and arrays.
   │                           They provide additional methods for object/array usage.
   │                           They are primarily used by api-clients and implementation apps.
   │
   └─ document               * The mongoose.Document(s) for the collection.
      │                        Documents describe objects returned from database collection.
      │
      └─ schema              * The mongoose.Schema for the collection.
         │                     Schema is used to describe database collection documents.
         │                     Schema is primarily used by api-server only.
         │
         └─ service          * The Service class(es) for the collection.
            │                  Service classes handle interactions with the database model(s).
            │
            └─ controller    * The Controller functions for the collection.
               │               Controller functions handle requests and responses.
               │
               └─ index      * The index (re)exports all exports of the collection.
                  │            The index provides modular encapsulation of all exports.
                  │            `router` function maps REST routes to respective Controller functions.
                  │
                  └─ spec    * The spec file tests all exports/functionality of the collection.

```
