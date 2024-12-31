// Import the JSON Web Token (JWT) library
const jwt = require("jsonwebtoken");

/**
 * Function to generate a JWT token
 * @param {string} userId - The unique identifier for the user
 * @returns {string} - A signed JWT token
 */
const generateToken = (userId) => {
  // Generate and return a signed token
  // Payload: { userId } - Includes the user's unique ID in the token payload
  // Secret Key: Retrieved from environment variable (process.env.JWT_SECRET)
  // Options: Token expiration set to 1 hour
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Export the function for use in other parts of the application
module.exports = generateToken;
