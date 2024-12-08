const express = require('express');
const { createLoan, approveLoan, getUserLoans, addRepayment, getLoanById, getLoans } = require('../controllers/loanController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// admin routes
router.route('/all').get(protect, admin, getLoans);
router.route('/:id/approve').put(protect, admin, approveLoan);

// user routes
router.route('/:id').get(protect, getLoanById);
router.route('/').post(protect, createLoan).get(protect, getUserLoans);
router.route('/:id/repay').put(protect, addRepayment);

module.exports = router;
