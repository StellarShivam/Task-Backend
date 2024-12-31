// Import required modules
const User = require("../models/userModel"); // User model for database operations
const bcrypt = require("bcryptjs"); // Library for hashing passwords
const { validationResult } = require("express-validator"); // For validating request inputs
const generateToken = require("../config/generateToken"); // Utility to generate JWT tokens
const HttpError = require("../models/http-error"); // Custom error class for handling errors

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.registerUser = (req, res, next) => {
  // Validate request inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs passed. Please check your email, and ensure the password is at least 6 characters.",
        422
      )
    );
  }

  // Extract required fields from the request body
  const { name, email, password } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password) {
    return next(new HttpError("Please enter all required fields.", 400));
  }

  // Check if the user already exists
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        const error = new HttpError(
          "User already exists, please log in instead.",
          422
        );
        return next(error);
      }

      // Hash the user's password before saving
      bcrypt
        .hash(password, 12)
        .then((hashedPw) => {
          // Create a new user instance
          const newUser = new User({
            name: name,
            email: email,
            password: hashedPw,
          });

          // Save the user to the database
          return newUser.save();
        })
        .then((createdUser) => {
          // Respond with the created user's details and token
          res.status(201).json({
            userId: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            token: generateToken(createdUser._id),
          });
        })
        .catch((err) => {
          const error = new HttpError(
            "Could not create user, please try again.",
            500
          );
          return next(error);
        });
    })
    .catch((err) => {
      const error = new HttpError(
        "Could not create user, please try again.",
        500
      );
      return next(error);
    });
};

/**
 * Authenticate an existing user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.authUser = (req, res, next) => {
  // Extract email and password from the request body
  const { email, password } = req.body;
  let loadedUser;

  // Find the user by email
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new HttpError(
          "Invalid credentials, could not log you in.",
          401
        );
        return next(error);
      }

      // Store the found user for later use
      loadedUser = user;

      // Compare the provided password with the hashed password in the database
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new HttpError(
          "Invalid credentials, could not log you in.",
          401
        );
        return next(error);
      }

      // Respond with user details and a generated token
      res.json({
        userId: loadedUser._id,
        email: loadedUser.email,
        name: loadedUser.name,
        token: generateToken(loadedUser._id),
      });
    })
    .catch((err) => {
      const error = new HttpError("Logging in failed, please try again.", 500);
      return next(error);
    });
};
