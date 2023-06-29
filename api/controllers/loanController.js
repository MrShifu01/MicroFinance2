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

module.exports = {
    getLoans,
    editLoans
}