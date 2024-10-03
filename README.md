
# Blog API Documentation

## Overview

This is an Express.js RESTful API server connected to MongoDB via Mongoose. It provides features for managing users, posts, and categories, with functionalities like authentication and authorization, password reset, and search capabilities. The server follows clean architecture principles, ensuring a well-structured and scalable codebase.

## Features

- **User Management:**
  - Create, read, update, and delete users.
  - Password reset functionality by email verification.
  - Authentication and authorization using JWT and cookies.

- **Post Management:**
  - Create, read, update, and delete posts.
  - Associate posts with one or multiple categories.
  - Search for posts by title, author, or category.

- **Category Management:**
  - Create, read, update, and delete categories.
  - Link posts to categories.
  - List all posts associated with a specific category.

- **Authentication & Authorization:**
  - JWT and cookies are used to secure endpoints.
  - Users need to sign in to access any features related to posts or categories.
  - Sensitive data is stored in environment variables.

- **Logging:**
  - All requests are logged for easy tracking and debugging.

- **Error Handling:**
  - Comprehensive error handling for both server-side and request-side errors.

## Installation & Running

To run the project locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/DenisGavar/blog.git
   cd blog
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory with the following variables (check a `.env.example` file):

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ...
   ```

4. **Run the Server:**

   ```bash
   node index.js
   ```

   The server should now be running on `http://localhost:3000`.

## Endpoints

### Authentication

- **POST `/signup`** - Register a new user.
- **POST `/signin`** - Sign in and receive a JWT token.
- **POST `/request-reset`** - Request password reset for a user by providing an email.

### User Endpoints

- **GET `/users`** - Get a list of all users.
- **GET `/users/:id`** - Get details of a specific user (includes populated posts).
- **POST `/users`** - Create a new user.
- **PUT `/users/:id`** - Update a user’s information.
- **DELETE `/users/:id`** - Delete a user.

### Post Endpoints

- **GET `/posts`** - Get a list of all posts.
- **GET `/posts/:id`** - Get details of a specific post.
- **POST `/posts`** - Create a new post.
- **PUT `/posts/:id`** - Update a post.
- **DELETE `/posts/:id`** - Delete a post.

- **GET `/posts/search`** - Search posts by title, author, or category. Use query parameters:
  - `?title=`
  - `?author=`
  - `?category=`
- **POST `/posts/:id/categories/:categoryIds`** - Link a post to categories.

### Category Endpoints

- **GET `/categories`** - Get a list of all categories.
- **GET `/categories/:id`** - Get details of a specific category (includes populated posts).
- **POST `/categories`** - Create a new category.
- **PUT `/categories/:id`** - Update a category.
- **DELETE `/categories/:id`** - Delete a category.

- **GET `/categories/:id/posts`** - Print all posts in a certain category.

## Authentication & Authorization

- **JWT & Cookies:** All endpoints require a valid JWT token for authentication, except the sign-up, sign-in and a password reset request routes.
- **CORS:** Configured to allow secure cross-origin requests.

## Error Handling

The server includes comprehensive error handling for both server-side and request-side issues, ensuring a robust API with meaningful error messages.

## Logging

All requests and actions are logged using the Winston library, which provides clear and readable logs for easy tracking and debugging.