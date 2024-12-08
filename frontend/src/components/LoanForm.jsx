import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';

export default function LoanForm() {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Basic validation
    if (!amount || !term) {
      setError('Please fill in all fields');
      return;
    }

    if (isNaN(Number(amount)) || isNaN(Number(term))) {
      setError('Amount and term must be valid numbers');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
      const { data } = await axiosInstance.post('/loans', { amount, term }, config);
      console.log('Loan application submitted:', data);
      setSuccess(true);
      navigate('/loans');
    } catch (error) {
      console.error('Error submitting loan application:', error);
      setError('Failed to submit loan application. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex gap-3 items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Loan Application</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Loan Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter loan amount"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="term" className="block text-sm font-medium text-gray-700">
              Loan Term (months)
            </label>
            <input
              type="number"
              id="term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter loan term"
              min="1"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Apply for Loan
          </button>
        </form>
        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-sm text-green-600">Loan application submitted successfully!</p>
        )}
      </div>
      {/* Check my loans */}
      <div className="bg-white p-8 rounded-lg shadow-md w-96 h-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Check My Loans</h2>
        <p className="text-center">You can check your loans here.</p>
        <button
          onClick={() => navigate('/loans')}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Check My Loans
        </button>
      </div>
    </div>
  );
}
