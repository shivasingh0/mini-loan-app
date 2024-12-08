const express = require('express');
const { createLoan, approveLoan, getUserLoans, addRepayment, getLoanById, getLoans } = require('../controllers/loanController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createLoan).get(protect, getUserLoans); // Existing routes
router.route('/all').get(protect, admin, getLoans); // New route to get all loans for admin

router.route('/:id').get(protect, getLoanById);
router.route('/:id/approve').put(protect, admin, approveLoan);
router.route('/:id/repay').put(protect, addRepayment);

module.exports = router;
