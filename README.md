# Task Tracker API

A secure, full‑stack ready REST API for creating, updating, retrieving, and deleting personal tasks. Built with Node.js, Express, MongoDB, and JWT authentication, this API allows each user to manage their own tasks safely and privately.

## Project Overview

The Task Tracker API provides user authentication and protected CRUD operations for managing tasks. Each user can register, log in, and perform task operations that are securely scoped to their own account. This API is designed for learning backend fundamentals and building full‑stack applications

## Features

- User Registration & Login with hashed passwords

- JWT Authentication with protected routes

- Create / Read / Update / Delete Tasks

- User‑scoped data (users can only access their own tasks)

- Auto‑incrementing taskId for easy referencing

- Input validation for required fields

- Clear error handling for all routes

## Technologies Used

- Node.js

- Express.js

- MongoDB + Mongoose

- bcryptjs for password hashing

- jsonwebtoken (JWT) for authentication

- dotenv for environment variable management

## Local Setup Instructions

1. Fork the repository - click the fork icon to the right and create a fork of the project in your own account

2. Clone the repository - in your own repository of the forked code, click the green "Code" button and copy the HTTP URL. Then in a terminal on your local machine, navigate to the folder where you'd like to keep your local repository files. Type this into your terminal:

bash

```
git clone your_repo_url_here
cd task-tracker-final
```

3. Install dependencies for the backend

bash

```
npm install
npm install express dotenv bcryptjs jsonwebtoken
npm install --save-dev nodemon
npm install cors
```

4. Install dependencies for the frontend

bash

```
cd ../frontend
npm install
```

5. Create a .env file in the project root
   Add the required environment variables (see next section).

6. Start the server in the backend

bash

```
cd ../backend
npm run dev
```

7. Start the project in the frontend

bash

```
cd ../frontend
npm run dev
```

The API will run on the port you specify in your .env.

## Required Environment Variables

Create a .env file in the backend folder with the following keys:

```
PORT=your_port_number
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a .env file in the frontend folder with the following keys:

```
VITE_API_URL=your_local_host_backend_url
```

**Do NOT include your actual values in the README or commit them to GitHub.**

## API Routes Overview

### Health Route

#### Method Endpoint Description

- GET /health Confirms API is running

### Auth Routes

#### Method Endpoint Description

- POST /register Register a new user
- POST /login Log in and receive a JWT

### Task Routes (Protected)

All task routes require a valid Authorization: Bearer <token> header.

#### Method Endpoint Description

- POST /tasks Create a new task
- GET /tasks Get all tasks for the logged‑in user
- GET /tasks/:taskId Get a single task by taskId
- PATCH /tasks/:taskId Update a task
- DELETE /tasks/:taskId Delete a task

## Testing Notes

- Use Postman, Thunder Client, or Insomnia to test routes

- Include the JWT token in the Authorization header for all protected routes

Example header:

`Authorization: Bearer <token>`

- Ensure your MongoDB instance is running before testing

## Known Issues / Future Improvements

- Add pagination for large task lists

- Add bulk create tasks route

- Add logout route

- Add user profile routes

- Add soft‑delete or archive functionality

- Add rate limiting for security

- Add request validation middleware (Joi / Zod)

- Add Swagger/OpenAPI documentation
