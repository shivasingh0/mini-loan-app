import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance/axiosInstance';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loans, setLoans] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loanResponse = await axiosInstance.get('/loans/all');
                
                const userSet = new Set();
                loanResponse.data.forEach((loan) => {
                    if (loan.user) {
                        userSet.add(JSON.stringify(loan.user));
                    }
                });
                
                setUsers(Array.from(userSet).map(user => JSON.parse(user)));
                setLoans(loanResponse.data);
            } catch (error) {
                setError('Failed to fetch data. Please try again.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleApproveLoan = async (loanId) => {
        try {
            await axiosInstance.put(`/loans/${loanId}/approve`);
            setLoans((prevLoans) =>
                prevLoans.map((loan) =>
                    loan._id === loanId ? { ...loan, status: 'APPROVED' } : loan
                )
            );
        } catch (error) {
            setError('Failed to approve loan. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-6 text-center">Loading Admin Dashboard...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
                {error && <p className="text-red-600">{error}</p>}

                <h2 className="text-xl font-semibold mb-4">Users</h2>
                <ul className="space-y-4">
                    {users.map((user) => (
                        <li key={user._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
                            <p>{user.name} ({user.email})</p>
                            <p>{user.isAdmin ? 'Admin' : 'User'}</p>
                        </li>
                    ))}
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">Loans</h2>
                <ul className="space-y-4">
                    {loans.map((loan) => (
                        <li key={loan._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
                            <div>
                                <p><strong>Amount:</strong> ${loan.amount}</p>
                                <p><strong>Term:</strong> {loan.term} months</p>
                                <p><strong>Status:</strong> {loan.status}</p>
                                <p><strong>Repayments:</strong></p>
                                <ul className="ml-4">
                                    {loan.repayments.map((repayment) => (
                                        <li key={repayment._id}>
                                            {new Date(repayment.date).toLocaleDateString()}: ${repayment.amount} - {repayment.status}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {loan.status !== 'APPROVED' && loan.status !== 'PAID' && (
                                <button
                                    onClick={() => handleApproveLoan(loan._id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Approve Loan
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
