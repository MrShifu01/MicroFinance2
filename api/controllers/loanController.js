const Loan = require('../models/Loan.js')
const asyncHandler = require('../middleware/asyncHandler.js')

// A file that handles all the logic of various CRUD operations in regards to the Loan data

// Function get all loans
// Route    GET /loans
// Access   Public
const getLoans = asyncHandler(async (req, res) => {
    try {
      const loans = await Loan.find()
      res.status(200).json(loans)
    } catch (error) {
      res.status(500).json({ message: "Error fetching loans", error })
    }
  });

// Function edit a loan
// Route    PUT /loans
// Access   Admin
const editLoans = asyncHandler(async (req, res) => {
    try {
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
        id: _id,
        loanDate,
        repaymentDate,
        loanAmount,
        repaymentAmount,
        settled,
        notes
      }
  
      const updatedLoan = await Loan.findOneAndUpdate(
        { _id: loanInfo.id },
        { $set: loanInfo },
        { new: true }
      )
  
      if (!updatedLoan) {
        return res.status(404).json({ message: "Loan not found" })
      }
  
      res.status(200).json(updatedLoan)
    } catch (error) {
      res.status(500).json({ message: "Error updating loan", error })
    }
  });

// Function add a new loan
// Route    POST /loans
// Access   Admin
const addLoan = asyncHandler(async (req, res) => {
    try {
      const { 
        idNumber, 
        loanDate, 
        repaymentDate, 
        loanAmount, 
        repaymentAmount, 
        settled, 
        notes } = req.body
      
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
    } catch (error) {
      res.status(500).json({ message: "Error adding loan", error })
    }
  });

// Function delete a loan
// Route    DELETE /loans
// Access   Admin
const deleteLoan = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const loanDoc = await Loan.deleteOne({ _id: id })

    if (loanDoc.deletedCount === 0) {
      // If no loan was deleted, return a 404 Not Found response
      return res.status(404).json({ message: 'Loan not found' })
    }

    res.status(200).json({ message: 'Loan deleted' })
  } catch (error) {
    // Handle any error that occurred during the deletion process
    console.log('Error deleting loan:', error)
    res.status(500).json({ message: 'Failed to delete loan' });
  }
});

module.exports = {
    getLoans,
    editLoans,
    addLoan,
    deleteLoan
}