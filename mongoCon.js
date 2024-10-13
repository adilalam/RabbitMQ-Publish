require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const URI = process.env.MONGO_URL;
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
    try {
        // Connect the client to the server
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } catch (err) {
        console.error(err);
      }
}

let db = client.db("dump");

module.exports = {
    connectDB,
    db
}