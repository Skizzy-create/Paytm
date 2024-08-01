# Paytm Simple Application

Welcome to the Paytm backend application! This project is built with Express.js and provides robust user authentication routes for signup, login, and more.

## 🚀 Getting Started

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
2. The server will be running at `http://localhost:3000`.

## 📦 Dependencies

This project uses the following libraries:

![bcryptjs](https://img.shields.io/badge/bcryptjs-^2.4.3-blue) ![cors](https://img.shields.io/badge/cors-^2.8.5-blue) ![dotenv](https://img.shields.io/badge/dotenv-^16.4.5-blue) ![express](https://img.shields.io/badge/express-^4.18.2-blue) ![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-^9.0.2-blue) ![mongoose](https://img.shields.io/badge/mongoose-^8.1.0-blue) ![zod](https://img.shields.io/badge/zod-^3.23.8-blue) ![nodemon](https://img.shields.io/badge/nodemon-3.1.4-blue)

## 🔥 Routes

### User Routes

#### Signup

- **URL**: `/api/v1/users/signup`
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
            "msg": "Username already taken"
        }
        ```

#### Login

- **URL**: `/api/v1/users/login`
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

#### Update User Info

- **URL**: `/api/v1/users`
- **Method**: `PUT`
- **Description**: Updates user information.
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
            "msg": "User Updated Successfully",
            "user": "updated user data"
        }
        ```
    - **Error**:
        ```json
        {
            "msg": "User Update Failed"
        }
        ```

#### Bulk User Retrieval

- **URL**: `/api/v1/users/bulk`
- **Method**: `GET`
- **Description**: Retrieves a list of users based on a filter.
- **Query Parameters**:
    - `filter`: (optional) A string to filter users by first or last name.
- **Response**:
    - **Success**:
        ```json
        {
            "users": [
                {
                    "username": "string",
                    "firstName": "string",
                    "lastName": "string",
                    "_id": "string"
                }
            ]
        }
        ```
    - **Error**:
        ```json
        {
            "msg": "Server Error"
        }
        ```
