// Import required modules
const express = require("express"); // Framework for creating routes
const { protect } = require("../middleware/authMiddleware"); // Middleware to protect routes with authentication
const taskController = require("../controllers/taskController"); // Controller for handling task-related logic

// Initialize the router
const router = express.Router();

/**
 * Route: POST /
 * Purpose: Create a new task
 * Middleware:
 *  - `protect`: Ensures the user is authenticated
 * Handler: Calls `createTask` function from `taskController`
 */
router.post("/", protect, taskController.createTask);

/**
 * Route: GET /
 * Purpose: Fetch all tasks for the authenticated user
 * Middleware:
 *  - `protect`: Ensures the user is authenticated
 * Handler: Calls `fetchAllTask` function from `taskController`
 */
router.get("/", protect, taskController.fetchAllTask);

/**
 * Route: GET /:id
 * Purpose: Fetch a specific task by its ID
 * Middleware:
 *  - `protect`: Ensures the user is authenticated
 * Handler: Calls `getTask` function from `taskController`
 */
router.get("/:id", protect, taskController.getTask);

/**
 * Route: PUT /:id
 * Purpose: Update a task by its ID
 * Middleware:
 *  - `protect`: Ensures the user is authenticated
 * Handler: Calls `updateTask` function from `taskController`
 */
router.put("/:id", protect, taskController.updateTask);

/**
 * Route: DELETE /:id
 * Purpose: Delete a task by its ID
 * Middleware:
 *  - `protect`: Ensures the user is authenticated
 * Handler: Calls `deleteTask` function from `taskController`
 */
router.delete("/:id", protect, taskController.deleteTask);

// Export the router for use in the main application
module.exports = router;
