const express = require('express');
const connectToMongo = require('C:/Users/tvovi/OneDrive/Desktop/web proj/public/db.js'); // Adjust the path to db.js
const app = express();
const port = 3000; // Adjust the port number as required

app.use(express.json()); // Middleware to parse JSON requests

connectToMongo(); // Initialize MongoDB Atlas connection

app.get('/', async (req, res) => {
  const db = await connectToMongo();
  const collection = db.collection('food'); // Adjust collection name
  const data = await collection.find({}).toArray();
  res.send(data);
});

app.post('/add', async (req, res) => {
  const db = await connectToMongo();
  const collection = db.collection('food'); // Adjust collection name
  const result = await collection.insertOne(req.body);
  res.send(result.ops);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

