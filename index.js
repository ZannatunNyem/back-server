const express = require('express');
const cors=require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port =process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

console.log(process.env.USER_NAME)
console.log(process.env.USER_PASS)


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.rwrnep3.mongodb.net/?appName=Cluster0`;

// const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.6uwrg3h.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const cocosCollection=client.db('cocoDB').collection('cocos');
    const usersCollection=client.db('cocoDB').collection('users');

    // --- GET All Coco Items ---
    app.get("/cocos", async (req, res) => {
      const result = await cocosCollection.find().toArray();
      res.send(result);
    });

    // --- GET Users ---
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // --- Home Route ---
    app.get("/", (req, res) => {
      res.send("Back-server is Running...");
    });

    // Send a ping to confirm a successful connection
     await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Chocolate World!')
})

 app.listen(port, () => {
   console.log(`Here is port ${port}`)
 })
// module.exports = app;
