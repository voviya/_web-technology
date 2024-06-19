window.onscroll = () =>{
    if (window.scrollY > 60) {
        document.querySelector('#scroll-top').classList.add('active');
        
    } else {
        document.querySelector('#scroll-top').classList.remove('active');
    }
}

function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
    setInterval(loader, 3000);
}

window.onload = fadeOut();
const express = require('express');
const connectToMongo = require('./db'); // Adjust the path to db.js
const app = express();
const port = 3000; // Adjust the port number as required

app.use(express.json()); // Middleware to parse JSON requests

connectToMongo(); // Initialize MongoDB connection

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
