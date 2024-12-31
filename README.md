# Backend Documentation

This repository contains the backend code for a task management application. The backend is built using Node.js, Express, and MongoDB. It provides APIs for user authentication and task management.

## Features
- User Authentication (Sign Up, Sign In)
- Task Management (Create, Read, Update, Delete tasks)
- Middleware for route protection using JSON Web Tokens (JWT)

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js for password hashing
- express-validator for input validation
- dotenv for environment variable management

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/StellarShivam/Task-Backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Task-Backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

6. The server will run on `http://localhost:3002` by default.

---

## API Endpoints

### User Authentication

#### POST `/users/signup`
- **Purpose**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - Success:
    ```json
    {
      "userId": "<user_id>",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "token": "<jwt_token>"
    }
    ```
  - Failure: Appropriate error message.

#### POST `/users/signin`
- **Purpose**: Authenticate an existing user.
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - Success:
    ```json
    {
      "userId": "<user_id>",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "token": "<jwt_token>"
    }
    ```
  - Failure: Appropriate error message.

---

### Task Management

#### POST `/tasks/`
- **Purpose**: Create a new task.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "title": "Complete project",
    "description": "Finish the backend module"
  }
  ```
- **Response**:
  - Success:
    ```json
    {
      "success": true,
      "task": {
        "_id": "<task_id>",
        "user": "<user_id>",
        "title": "Complete project",
        "description": "Finish the backend module",
        "createdAt": "<timestamp>",
        "updatedAt": "<timestamp>"
      }
    }
    ```
  - Failure: Appropriate error message.

#### GET `/tasks/`
- **Purpose**: Fetch all tasks for the authenticated user.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```
- **Response**:
  - Success:
    ```json
    {
      "success": true,
      "count": <number_of_tasks>,
      "tasks": [
        {
          "_id": "<task_id>",
          "user": {
            "name": "John Doe",
            "email": "johndoe@example.com"
          },
          "title": "Complete project",
          "description": "Finish the backend module",
          "createdAt": "<timestamp>",
          "updatedAt": "<timestamp>"
        }
      ]
    }
    ```
  - Failure: Appropriate error message.

#### GET `/tasks/:id`
- **Purpose**: Fetch a specific task by ID.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```
- **Response**:
  - Success:
    ```json
    {
      "success": true,
      "task": {
        "_id": "<task_id>",
        "user": {
          "name": "John Doe",
          "email": "johndoe@example.com"
        },
        "title": "Complete project",
        "description": "Finish the backend module",
        "createdAt": "<timestamp>",
        "updatedAt": "<timestamp>"
      }
    }
    ```
  - Failure: Appropriate error message.

#### PUT `/tasks/:id`
- **Purpose**: Update a task's status.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "status": "completed"
  }
  ```
- **Response**:
  - Success:
    ```json
    {
      "success": true,
      "task": {
        "_id": "<task_id>",
        "user": "<user_id>",
        "title": "Complete project",
        "description": "Finish the backend module",
        "status": "completed",
        "createdAt": "<timestamp>",
        "updatedAt": "<timestamp>"
      }
    }
    ```
  - Failure: Appropriate error message.

#### DELETE `/tasks/:id`
- **Purpose**: Delete a task by ID.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```
- **Response**:
  - Success:
    ```json
    {
      "success": true,
      "message": "Task deleted successfully"
    }
    ```
  - Failure: Appropriate error message.

---

## Error Handling
The application uses centralized error handling middleware to send structured error responses with appropriate HTTP status codes and messages.



