const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.rwrnep3.mongodb.net/cocoDB?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("MongoDB Connected!");

    const cocosCollection = client.db('cocoDB').collection('cocos');
    const usersCollection = client.db('cocoDB').collection('users');

    // --- Home Route ---
    app.get("/", (req, res) => {
      res.send("Back-server is Running...");
    });

    // --- Test Route ---
    app.get("/test", (req, res) => {
      res.send("Test route working!");
    });

    // --- Get all cocos ---
    app.get("/cocos", async (req, res) => {
      const result = await cocosCollection.find().toArray();
      res.json(result);
    });

    // --- Get all users ---
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.json(result);
    });

    // Ping test
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

run().catch(console.dir);

// --- Listen ---
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
