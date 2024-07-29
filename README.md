# Project Name

## Overview
This project is a backend application built with Express.js. It includes user authentication routes for signup and login.

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Skizzy-create/Paytm.git
    ```
2. Navigate to the project directory:
    ```bash
    cd backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Running the Application
1. Start the server:
    ```bash
    nodemon index.js
    ```
2. The server will be running at `https://localhost:3000`.

## Dependencies
This project uses the following libraries:
- ![bcryptjs](https://img.shields.io/badge/bcryptjs-^2.4.3-blue)
- ![cors](https://img.shields.io/badge/cors-^2.8.5-blue)
- ![dotenv](https://img.shields.io/badge/dotenv-^16.4.5-blue)
- ![express](https://img.shields.io/badge/express-^4.18.2-blue)
- ![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-^9.0.2-blue)
- ![mongoose](https://img.shields.io/badge/mongoose-^8.1.0-blue)
- ![zod](https://img.shields.io/badge/zod-^3.23.8-blue)
- ![nodemon](https://img.shields.io/badge/nodemon-^2.0.15-blue)

## Routes

### User Routes

#### Signup
- **URL**: `/api/v1/user/signup`
- **Method**: `POST`
- **Description**: Creates a new user.
- **Request Body**:
    ```json
    {
        "username": "string",
        "firstName": "string",
        "lastName": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **Success**:
        ```json
        {
            "msg": "User Created Successfully",
            "token": "JWT token"
        }
        ```
    - **Error**:
        ```json
        {
            "msg": "UserName already taken"
        }
        ```

#### Login
- **URL**: `/api/v1/user/login`
- **Method**: `POST`
- **Description**: Logs in an existing user.
- **Request Body**:
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **Success**:
        ```json
        {
            "msg": "User Logged In Successfully",
            "token": "JWT token"
        }
        ```
    - **Error**:
        ```json
        {
            "msg": "User not found / Credentials Incorrect"
        }
        ```

## Postman Collection
You can use the following Postman requests to test the routes:

### Signup Request
- **Method**: `POST`
- **URL**: `https://localhost:3000/api/v1/user/signup`
- **Body**:
    ```json
    {
        "username": "testuser",
        "firstName": "Test",
        "lastName": "User",
        "password": "password123"
    }
    ```

### Login Request
- **Method**: `POST`
- **URL**: `https://localhost:3000/api/v1/user/login`
- **Body**:
    ```json
    {
        "username": "testuser",
        "password": "password123"
    }
    ```

