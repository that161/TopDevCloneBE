const mongoose = require('mongoose');
const { DB_MONGO_URI } = require('../configs');

async function connectMongo() {
  try {
    await mongoose.connect(DB_MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { connectMongo };
