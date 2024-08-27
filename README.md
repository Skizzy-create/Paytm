# 🏦 Paytm Clone - Full-Stack Application

Welcome to the **Paytm Clone** application! This project is a robust full-stack implementation featuring a React frontend and an Express.js backend, mimicking key functionalities of the Paytm app. The app allows users to sign up, log in, check balances, transfer funds, and view transaction details with a user-friendly interface.

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed before starting the project:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### 🛠 Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/skizzy-creates-projects/paytm-clone.git
   cd paytm-clone
   ```

2. **Backend Setup:**

   - Navigate to the backend directory:

     ```bash
     cd backend
     ```

   - Install backend dependencies:

     ```bash
     npm install
     ```

   - Start the backend server:

     ```bash
     nodemon index.js
     ```

   - The backend server will run on `http://localhost:3000`.

3. **Frontend Setup:**

   - Navigate to the frontend directory:

     ```bash
     cd frontend
     ```

   - Install frontend dependencies:

     ```bash
     npm install
     ```

   - Start the frontend application:

     ```bash
     npm run dev
     ```

   - The frontend app should be accessible at [http://localhost:3000](http://localhost:3000).

## 🧭 Routing Overview

### 📂 Frontend Pages

1. **Signup Page (`/Signup`)**
   - New users can register by providing their first name, last name, email, and password.
   - After successful registration, the user is redirected to the Dashboard.

2. **Signin Page (`/Signin`)**
   - Users can log in using their email and password.
   - On successful login, the user is redirected to the Dashboard.

3. **Dashboard Page (`/dashboard`)**
   - Displays the user's balance and a list of users.
   - The balance can be refreshed by clicking the "Refresh Balance" button.

4. **Send Money Page (`/send`)**
   - Allows users to send money to another user.
   - On submitting the amount, the app initiates a transaction and redirects to the Transaction page.

5. **Transaction Page (`/transaction`)**
   - Displays the details of a transaction, including the recipient's name, transaction status, and amount transferred.
   - Provides a button to return to the Dashboard.

### 🔄 Transaction Flow

- Users initiate a money transfer from the **Send Money** page by sending a POST request to the backend with the recipient's ID and the amount.
- The backend processes the request and responds with the transaction status.
- The frontend then redirects the user to the **Transaction** page, where the **TransactionBlock** component displays transaction details with dynamic styling based on the status.

## 🔥 Backend API Overview

### 📦 Dependencies

The backend is powered by the following libraries:

- bcryptjs
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- zod
- nodemon

### 🚏 API Endpoints

#### **User Routes**

1. **Signup**

   - **URL**: `/api/v1/user/signup`
   - **Method**: `POST`
   - **Description**: Creates a new user and an associated account with a random balance.
   - **Request Body**:
     ```json
     {
         "username": "string (must be an email)",
         "firstName": "string",
         "lastName": "string",
         "password": "string (minimum 6 characters)"
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

2. **Login**

   - **URL**: `/api/v1/user/login`
   - **Method**: `POST`
   - **Description**: Logs in an existing user.
   - **Request Body**:
     ```json
     {
         "username": "string (must be an email)",
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

3. **Update User Info**

   - **URL**: `/api/v1/user`
   - **Method**: `PUT`
   - **Description**: Updates user information.
   - **Request Body**:
     ```json
     {
         "username": "string (optional)",
         "firstName": "string (optional)",
         "lastName": "string (optional)",
         "password": "string (optional)"
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

4. **Bulk User Retrieval**

   - **URL**: `/api/v1/user/bulk`
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

#### **Account Routes**

1. **Check Balance**

   - **URL**: `/api/v1/account/balance`
   - **Method**: `GET`
   - **Description**: Retrieves the balance of the logged-in user's account.
   - **Headers**:
     - `Authorization`: `Bearer <JWT token>`
   - **Response**:
     - **Success**:
       ```json
       {
           "balance": "number"
       }
       ```
     - **Error**:
       ```json
       {
           "msg": "User/Account not found Invalid Creds"
       }
       ```

2. **Transfer Funds**

   - **URL**: `/api/v1/account/transfer`
   - **Method**: `POST`
   - **Description**: Transfers funds from the logged-in user's account to another user's account.
   - **Headers**:
     - `Authorization`: `Bearer <JWT token>`
   - **Request Body**:
     ```json
     {
         "to": "string (receiver's user ID)",
         "amount": "number (amount to transfer)"
     }
     ```
   - **Response**:
     - **Success**:
       ```json
       {
           "msg": "Transfer Successful",
           "transaction": "transaction details"
       }
       ```
     - **Error**:
       ```json
       {
           "msg": "Invalid Account/ Creds" or "Insufficient Balance" or "Invalid account - NO USER FOUND"
       }
       ```

#### **Additional Routes**

1. **Display Users (Frontend)**

   - **URL**: `/displayUsers`
   - **Method**: `GET`
   - **Description**: Serves an HTML page displaying a list of users.
   - **Response**: An HTML page showing user data.

2. **Accounts**

   - **URL**: `/accounts`
   - **Method**: `GET`
   - **Description**: Retrieves all accounts in the database.
   - **Response**:
     - **Success**:
       ```json
       {
           "accounts": [
               {
                   "userId": "string",
                   "balance": "number"
               }
           ]
       }
       ```
     - **Error**:
       ```json
       {
           "msg": "Server Error --Account Balance Route",
           "error": "error details"
       }
       ```

### 🌐 CORS Setup

The backend uses CORS to allow requests from specific origins:

- `http://localhost:5173`
- `https://paytm-olive-three.vercel.app`
- `https://paytm-git-main-skizzy-creates-projects.vercel.app`
- `https://paytm-skizzy-creates-projects.vercel.app`

### 🛠️ Middleware

1. **Utility Middleware**

   - **countRequests**: Tracks the number of requests made to the server.
   - **countTime**: Logs the time taken by each request.

2. **Authentication Middleware**

   - **authMiddleware**: Protects routes by ensuring the user is authenticated.
   - **authenticateToken**: Verifies JWT tokens.

### 📝 Validation

The backend uses **Zod** for validating request bodies:

- **userSingUpZod**: Validates signup data.
- **userLoginZod**: Validates

 login data.
- **userUpdateZod**: Validates user update data.
- **accountTransferZod**: Validates transfer data.

## 🚀 Deployment

The project is deployed on [Render](https://render.com/), and the frontend is hosted on [Vercel](https://vercel.com/).

- **Backend Deployment**: [Paytm Clone Backend](https://paytm-e228.onrender.com)
- **Frontend Deployment**: [Paytm Clone Frontend](https://paytm-skizzy-creates-projects.vercel.app)

## 🎉 Future Enhancements

- Add more detailed transaction history.
- Implement a notification system for transactions.
- Enhance UI/UX with more animations and responsiveness.

## 🧑‍💻 Author

- **Kartik Aslia**

## 📄 License

This project is licensed under the MIT License.
