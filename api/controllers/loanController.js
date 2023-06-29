const Loan = require('../models/Loan.js')

// Function get all loans
// Route    GET /loans
// Access   Public
const getLoans = async (req, res) => {
    const loans = await Loan.find()
    res.status(200).json(loans)
}

// Function get all loans
// Route    GET /loans
// Access   Public
const editLoans = async (loanInfo, req, res) => {
    const updatedLoan = await Loan.findOneAndUpdate(
        { _id: loanInfo.id },
        { $set: loanInfo },
        { new: true }
      );
      res.status(200).json(updatedLoan);
}

// Function add loan
// Route    POST /loans
// Access   Admin
const addLoan = async (req, res) => {
    const { idNumber, loanDate, repaymentDate, loanAmount, repaymentAmount, settled, notes } = req.body
    const loanDoc = await Loan.create({
        idNumber,
        loanDate, 
        repaymentDate, 
        loanAmount, 
        repaymentAmount, 
        settled, 
        notes
    })
    res.status(200).json(loanDoc)
}

module.exports = {
    getLoans,
    editLoans,
    addLoan
}