// Import Task and User models
const Task = require("../models/taskModel");
const User = require("../models/userModel");

/**
 * Create a new task
 * @param {Object} req - Express request object containing the task data in `req.body`
 * @param {Object} res - Express response object to send the response
 * @param {Function} next - Express next middleware function
 */
exports.createTask = async (req, res, next) => {
  const { userId } = req.user; // Extract user ID from authenticated user
  try {
    const { title, description } = req.body; // Extract task details from request body

    // Create a new task and associate it with the user
    const task = await Task.create({
      user: userId,
      title,
      description,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Fetch all tasks for the authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.fetchAllTask = async (req, res, next) => {
  const { userId } = req.user; // Extract user ID from authenticated user
  try {
    // Find all tasks for the user, populate user details, and sort by creation date (descending)
    const tasks = await Task.find({ user: userId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Fetch a specific task by ID
 * @param {Object} req - Express request object containing task ID in `req.params`
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getTask = async (req, res, next) => {
  const { userId } = req.user; // Extract user ID from authenticated user
  try {
    // Find the task by ID and user, and populate user details
    const task = await Task.findOne({
      _id: req.params.id,
      user: userId,
    }).populate("user", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update the status of a task
 * @param {Object} req - Express request object containing task ID in `req.params` and updated status in `req.body`
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.updateTask = async (req, res, next) => {
  const { userId } = req.user; // Extract user ID from authenticated user
  try {
    const { status } = req.body;

    // Validate the status value
    if (!["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // Find and update the task
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: userId,
      },
      { status },
      { new: true, runValidators: true } // Return the updated task and validate inputs
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete a task by ID
 * @param {Object} req - Express request object containing task ID in `req.params`
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.deleteTask = async (req, res, next) => {
  const { userId } = req.user; // Extract user ID from authenticated user
  try {
    // Find and delete the task
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
