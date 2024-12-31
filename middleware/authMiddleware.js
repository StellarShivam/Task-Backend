// Import required modules
const jwt = require("jsonwebtoken"); // For verifying JWT tokens
const User = require("../models/userModel"); // User model (if needed for additional user validation)
const asyncHandler = require("express-async-handler"); // For handling async errors in middleware
const HttpError = require("../models/http-error"); // Custom error class for consistent error handling

/**
 * Middleware to protect routes by validating JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for the token in the authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the "Bearer" prefix
      token = req.headers.authorization.split(" ")[1];
      console.log(token); // Debugging: log the token

      // Decode the token to retrieve the user information
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded user ID to the request object for downstream use
      req.user = { userId: decoded.userId };

      // Pass control to the next middleware or route handler
      next();
    } catch (e) {
      // Handle errors during token verification
      const error = new HttpError("Not authorized, please log in.", 401);
      return next(error);
    }
  }

  // If no token is provided, send an unauthorized error
  if (!token) {
    const error = new HttpError("Not authorized, please log in.", 401);
    return next(error);
  }
});

// Export the middleware function
module.exports = { protect };
