# Mini Loan App

This is a mini loan application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Tailwind CSS for styling. The application allows authenticated users to apply for loans and make repayments, while administrators can approve loans.

## Features

- User registration and login
- Apply for a loan
- View user loans
- Make loan repayments
- Admin approval for loans
- Protected routes for authenticated users

## Installation

### Prerequisites

- Node.js
- npm
- MongoDB

### Project Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/shivasingh0/mini-loan-app
    cd mini-loan-app
    ```

### Backend Setup

1. Install dependencies for Backend:

    ```bash
    npm install
    ```

2. Create a `.env` file in `mini-loan-app` directory with the following content:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

3. Start the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the `frontend` directory and install dependencies:

    ```bash
    cd frontend
    npm install
    ```

2. Start the frontend development server:

    ```bash
    npm start
    ```

## Usage

1. Register a new user at `/register`.
2. Log in with the registered user credentials at `/login`.
3. Apply for a loan at `/apply-loan`.
4. View user loans at `/loans`.
5. Make loan repayments at `/repay-loan/:id`.

## Postman Collection
https://bold-astronaut-330518.postman.co/workspace/My-Public-Workspace~addd864d-9c5e-41a4-bb9d-d2c6686fb6c3/collection/31826553-862d4508-c989-4a22-90fb-d7bce0a25ecc?action=share&creator=31826553&active-environment=31826553-45540bfd-2242-4ef1-a1b1-15b517f30cd3

