// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // Routes for user authentication
const taskRoutes = require("./routes/taskRoutes"); // Routes for task management
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Database connection configuration

// Initialize express application
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Define routes for user-related operations
app.use("/users", authRoutes);

// Define routes for task-related operations
app.use("/tasks", taskRoutes);

// Middleware to handle unknown routes
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404); // Create a new error with 404 status
  throw error; // Forward the error to the error-handling middleware
});

// Error-handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    // If response headers are already sent, delegate error to the next handler
    return next(error);
  }
  res.status(error.code || 500); // Set HTTP status code (default to 500 if not specified)
  res.json({ message: error.message || "An unknown error occurred!" }); // Respond with error details
});

// Define the port for the server
const PORT = process.env.PORT || 3002;

// Start the server and listen for incoming requests
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
