---
title: MongoDB
---

```sh
# vtmongo db ackee collection
# vtmongo.ackee
# mongodb+srv://dbUser:dbUserPassword@cluster0.ymiwm.mongodb.net/vtmongo?retryWrites=true&w=majority
# mongodb+srv://dbUser:dbUserPassword@cluster0.ymiwm.mongodb.net/vtmongo.ackee?retryWrites=true&w=majority
# mongodb+srv://dbUser:dbUserPassword@cluster0.ymiwm.mongodb.net/vtmongo mongo
# mongodb+srv://cluster0.ymiwm.mongodb.net/vtmongo --username dbUser
# mongodb+srv://dbUser:dbUserPassword@cluster0.ymiwm.mongodb.net/vtmongo

mongo "mongodb+srv://cluster0.ymiwm.mongodb.net/vtmongo" --username dbUser
heroku config:add "ACKEE_MONGODB=mongodb://<host>:<port>/<db>"

```

## Node.js

```js
const MongoClient = require('mongodb').MongoClient
const uri =
  'mongodb+srv://dbUser:<password>@cluster0.ymiwm.mongodb.net/<dbname>?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlParser: true})
client.connect(err => {
  const collection = client.db('test').collection('devices')
  // perform actions on the collection object
  client.close()
})
```

## PHP

```php
$client = new MongoDB\Client(
    'mongodb+srv://dbUser:<password>@cluster0.ymiwm.mongodb.net/<dbname>?retryWrites=true&w=majority');

$db = $client->test;
```

## Ruby

```ruby
client = Mongo::Client.new(&apos;mongodb+srv://dbUser:<password>@cluster0.ymiwm.mongodb.net/<dbname>?retryWrites=true&w=majority&apos;)
```

## Python

```python
client = pymongo.MongoClient("mongodb+srv://dbUser:<password>@cluster0.ymiwm.mongodb.net/<dbname>?retryWrites=true&w=majority")
db = client.test
```
