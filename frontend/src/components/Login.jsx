import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      // Store token and isAdmin in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAdmin", data.isAdmin);

      navigate("/");


    } catch (error) {
      console.error(error || "Login failed");
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Login
      </button>
      <Link
        to="/register"
        className="w-full"
      >
        If you don't have an account, <span className="text-blue-500">Register</span>
      </Link>
    </form>
  );
};

export default Login;
