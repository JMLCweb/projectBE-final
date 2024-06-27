const { MongoClient } = require('mongodb');

const mongoUrl = process.env.MONGO_URL;
const client = new MongoClient(mongoUrl);

const connectToDB = async () => {
  try {
    await client.connect();
    return client.db('projectDB');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Failed to connect to the database.');
  }
};

module.exports = connectToDB;
