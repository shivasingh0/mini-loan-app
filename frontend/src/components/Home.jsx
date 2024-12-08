import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1 className="bg-blue-500 mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Welcome to the mini loan app
      </h1>

      {localStorage.getItem("isAdmin") === "true" ? (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/admin">Admin Dashboard</Link>
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <Link to="/apply-loan">Apply for a loan</Link>
        </button>
      )}
    </>
  );
};

export default Home;
