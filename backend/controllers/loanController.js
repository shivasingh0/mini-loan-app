const Loan = require('../models/loan');

const createLoan = async (req, res) => {
    const { amount, term } = req.body;
    const user = req.user.id;

    const repayments = [];
    const weeklyAmount = (amount / term).toFixed(2);
    let repaymentDate = new Date();

    for (let i = 0; i < term; i++) {
        repaymentDate.setDate(repaymentDate.getDate() + 7);
        repayments.push({ date: new Date(repaymentDate), amount: weeklyAmount });
    }

    const loan = new Loan({ user, amount, term, repayments });

    await loan.save();
    res.status(201).json(loan);
};

const approveLoan = async (req, res) => {
    console.log(req)
    try {
        const loan = await Loan.findById(req.params.id).exec();
        
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        loan.status = 'APPROVED';
        await loan.save();
        res.json(loan);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserLoans = async (req, res) => {
    const loans = await Loan.find({ user: req.user.id });
    res.json(loans);
};

const getLoanById = async (req, res) => {
    const loan = await Loan.findById(req.params.id);
    // console.log(loan)

    if (loan) {
        res.json(loan);
    } else {
        res.status(404).json({ message: 'Loan not found' });
    }
};

const addRepayment = async (req, res) => {
    const { amount } = req.body;
    const loan = await Loan.findById(req.params.id);

    if (loan) {
        const repayment = loan.repayments.find(r => r.status === 'PENDING');
        if (repayment && amount >= repayment.amount) {
            repayment.status = 'PAID';
            await loan.save();

            if (loan.repayments.every(r => r.status === 'PAID')) {
                loan.status = 'PAID';
                await loan.save();
            }

            res.json(loan);
        } else {
            res.status(400).json({ message: 'Invalid repayment amount' });
        }
    } else {
        res.status(404).json({ message: 'Loan not found' });
    }
};

// Fetch all loans (Admin only)
const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find().populate('user', 'name email'); // Populate user details if needed
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createLoan,
    approveLoan,
    getUserLoans,
    addRepayment,
    getLoanById,
    getLoans
};
