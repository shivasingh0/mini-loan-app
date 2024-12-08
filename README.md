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
- npm or yarn
- MongoDB

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/mini-loan-app.git
    cd mini-loan-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in `mini-loan-app` directory with the following content:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:

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

## Project Structure

mini-loan-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── loanController.js
│   ├── models/
│   │   └── Loan.js
│   ├── routes/
│   │   └── loanRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
|   ├── package.json
|   ├── .env
├── frontend/
│   ├── public/
│   ├── src/
│   ├── tailwind.config.js
│   └── ...
└── README.md