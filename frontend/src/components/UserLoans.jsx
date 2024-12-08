import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';

const UserLoans = () => {
    const [loans, setLoans] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // To handle loading state

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const { data } = await axiosInstance.get('/loans');
                setLoans(data);
            } catch (error) {
                setError('Failed to fetch loans. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    const getPendingRepayments = (repayments) => {
        return repayments.filter((repayment) => repayment.status === 'PENDING');
    };

    const isLoanFullyPaid = (repayments) => {
        return repayments.every((repayment) => repayment.status === 'PAID');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-6 text-center">Loading Your Loans...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Your Loans</h1>
                {error && <p className="text-red-600">{error}</p>}

                {loans.length === 0 ? (
                    <p className="text-center text-gray-500">You don't have any loans yet.</p>
                ) : (
                    <ul>
                        {loans.map((loan) => {
                            const pendingRepayments = getPendingRepayments(loan.repayments);
                            console.log(pendingRepayments);
                            const fullyPaid = isLoanFullyPaid(loan.repayments);
                            return (
                                <li key={loan._id} className="mb-4">
                                    <p><strong>Amount:</strong> ${loan.amount}</p>
                                    <p><strong>Term:</strong> {loan.term} months</p>
                                    <p><strong>Status:</strong> {loan.status}</p>
                                    
                                    {/* Check if the loan is approved and has pending repayments */}
                                    {loan.status === 'APPROVED' && !fullyPaid ? (
                                        <Link to={`/loans/${loan._id}/repay`} className="text-blue-500">Make a repayment</Link>
                                    ) : (
                                        fullyPaid ? (
                                            <p className="text-gray-500">Loan fully paid. No pending repayments.</p>
                                        ) : (
                                            <p className="text-gray-500">Loan is not approved. Repayment not possible.</p>
                                        )
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserLoans;
