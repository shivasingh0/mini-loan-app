const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    term: { type: Number, required: true },
    repayments: [
        {
            date: { type: Date, required: true },
            amount: { type: Number, required: true },
            status: { type: String, default: 'PENDING' }
        }
    ],
    status: { type: String, default: 'PENDING' },
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
