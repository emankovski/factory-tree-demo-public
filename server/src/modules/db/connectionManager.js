const MongoClient = require("mongodb").MongoClient

// Connection URL
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_URL}:27017?authMechanism=SCRAM-SHA-1&authSource=demo`

const runQuery = transaction => {
  return new Promise((resolve, reject) =>
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) {
          console.error(
            `Could not connect to Mongo DB. Server URL is:${process.env.MONGO_URL}. Reason:  ${err}`
          )
        } else {
          return transaction(client.db("demo"))
            .then(result => {
              client.close()
              resolve(result)
            })
            .catch(err => {
              console.error(err)
              reject(err)
            })
        }
      }
    )
  )
}

module.exports = runQuery
