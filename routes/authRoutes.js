// Import required modules
const express = require("express"); // Framework for creating routes
const authController = require("../controllers/authController"); // Controller for handling authentication logic
const { check } = require("express-validator"); // Middleware for request validation

// Initialize the router
const router = express.Router();

/**
 * Route: POST /signup
 * Purpose: Register a new user
 * Middleware:
 *  - Validates the `email` field to ensure it contains a valid email address
 *  - Validates the `password` field to ensure it is at least 6 characters long
 * Handler: Calls the `registerUser` function from the `authController`
 */
router.post(
  "/signup",
  [
    check("email").isEmail().withMessage("Please provide a valid email"), // Validate email format
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"), // Validate password length
  ],
  authController.registerUser
);

/**
 * Route: POST /signin
 * Purpose: Authenticate an existing user
 * Handler: Calls the `authUser` function from the `authController`
 */
router.post("/signin", authController.authUser);

// Export the router for use in the main application
module.exports = router;
