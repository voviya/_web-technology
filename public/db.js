const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://tvoviya354:<jana1502>@cluster0.jugpzux.mongodb.net/food?retryWrites=true&w=majority'; // Replace with your MongoDB Atlas URI
const dbName = 'food'; // Replace with your database name

let db;

const connect = async () => {
  if (db) return db;

  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = client.db(dbName);
    console.log('Connected to MongoDB Atlas');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
};

module.exports = connect;
