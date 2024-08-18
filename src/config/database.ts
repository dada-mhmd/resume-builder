const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // if (!process.env.MONGO_URI) {
    //   throw new Error('MONGO_URI is not defined in the environment variables');
    // }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB database');
  } catch (error) {
    console.log('Error connecting to mongodb', error);
    process.exit(1);
  }
};

export default connectDB;
