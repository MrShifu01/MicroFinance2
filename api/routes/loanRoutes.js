const express = require('express') 
const router = express.Router()
const { getLoans, editLoans } = require('../controllers/loanController.js')
const Loan = require('../models/Loan.js')

router.get('/', getLoans)
router.put('/', (req, res) => {
    const {
        _id,
        loanDate,
        repaymentDate,
        loanAmount,
        repaymentAmount,
        settled,
        notes
    } = req.body

    const loanInfo = {
        id:_id,
        loanDate,
        repaymentDate,
        loanAmount,
        repaymentAmount,
        settled,
        notes
    }
    
    editLoans(loanInfo, req, res)
})

module.exports = router