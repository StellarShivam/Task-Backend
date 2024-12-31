// Import mongoose library for MongoDB connection
const mongoose = require("mongoose");

// Asynchronous function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log the host information on successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error message if the connection fails
    console.log(`Error: ${error.message}`);

    // Exit the process with a failure code
    process.exit(1);
  }
};

// Export the function for use in other files
module.exports = connectDB;
