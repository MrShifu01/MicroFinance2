const express = require('express') 
const router = express.Router()
const { getLoans, editLoans, addLoan, deleteLoan } = require('../controllers/loanController.js')
const JWTHandler = require('../middleware/JWTHandler.js')
const isAdminHandler = require('../middleware/isAdminHandler.js')

// Get all loans
router.get('/', getLoans)

// Edit a loan (AdminOnly)
router.put('/', JWTHandler, isAdminHandler, editLoans)

// Add a new loan (AdminOnly)
router.post('/', JWTHandler, isAdminHandler, addLoan)

// Add a new loan (AdminOnly)
router.delete('/:id', JWTHandler, isAdminHandler, deleteLoan)

module.exports = router