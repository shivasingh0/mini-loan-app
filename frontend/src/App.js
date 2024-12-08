import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import LoanForm from "./components/LoanForm";
import UserLoans from "./components/UserLoans";
import RepaymentForm from "./components/RepaymentForm";
import ProtectedRoute from "./components/ProtectedRoute";
// import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
        <Navbar /> {/* Add Navbar here */}
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold my-4">Mini Loan App</h1>
          <Routes>
            {/* Admin route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-loan"
              element={
                <ProtectedRoute>
                  <LoanForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/loans"
              element={
                <ProtectedRoute>
                  <UserLoans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/loans/:id/repay"
              element={
                <ProtectedRoute>
                  <RepaymentForm />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
    </Router>
  );
};

export default App;
