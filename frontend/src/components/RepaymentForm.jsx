import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';

const RepaymentForm = () => {
    const { id } = useParams();
    const [amount, setAmount] = useState('');
    const [loan, setLoan] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchLoan = async () => {
            try {
                const { data } = await axiosInstance.get(`/loans/${id}`);
                setLoan(data);
            } catch (error) {
                setError('Failed to fetch loan details. Please try again.');
            }
        };

        fetchLoan();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Check if loan status is approved
        if (loan && loan.status !== 'APPROVED') {
            setError('Loan is not approved. You cannot make a repayment.');
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        // Ensure repayment amount does not exceed the pending amount
        const totalPending = calculateAmounts(loan.repayments).totalPending;
        if (Number(amount) > totalPending) {
            setError('Repayment amount exceeds pending amount.');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };
            const { data } = await axiosInstance.put(`/loans/${id}/repay`, { amount }, config);
            setSuccess(true);
            setLoan(data);
        } catch (error) {
            setError('Failed to make repayment. Please try again.');
        }
    };

    const calculateAmounts = (repayments) => {
        let totalPaid = 0;
        let totalPending = 0;

        repayments.forEach(repayment => {
            if (repayment.status === 'PAID') {
                totalPaid += repayment.amount;
            } else if (repayment.status === 'PENDING') {
                totalPending += repayment.amount;
            }
        });

        return { totalPaid, totalPending };
    };

    const getNextRepayment = (repayments) => {
        const pendingRepayments = repayments.filter(repayment => repayment.status === 'PENDING');
        if (pendingRepayments.length > 0) {
            return pendingRepayments[0];  // First pending repayment is the next one
        }
        return null; // If no pending repayments, return null
    };

    const nextRepayment = loan ? getNextRepayment(loan.repayments) : null;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Repayment Form</h1>
                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">Repayment successful!</p>}
                {loan && (
                    <div>
                        <p><strong>Loan Amount:</strong> ${loan.amount}</p>
                        <p><strong>Remaining Term:</strong> {loan.term} months</p>
                        <p><strong>Total Paid:</strong> ${calculateAmounts(loan.repayments).totalPaid}</p>
                        <p><strong>Total Pending:</strong> ${calculateAmounts(loan.repayments).totalPending}</p>

                        {nextRepayment ? (
                            <div>
                                <p><strong>Next Payment Due:</strong> ${nextRepayment.amount}</p>
                                <p><strong>Due Date:</strong> {new Date(nextRepayment.date).toLocaleDateString()}</p>
                            </div>
                        ) : (
                            <p>No pending payments.</p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                    Repayment Amount ($)
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter repayment amount"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Make Repayment
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RepaymentForm;
