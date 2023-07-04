const mongoose = require('mongoose')

// Define the schema for the Loan model
const LoanSchema = new mongoose.Schema({
    idNumber: {
        type: String,
        ref: "Client", // Reference to the Client model
        required: true
    },
    loanDate: Date,
    repaymentDate: Date,
    loanAmount: Number,
    repaymentAmount: Number,
    settled: {
        type: Boolean,
        default: false
    },
    notes: String
}, { timestamps: true })

// Create the Loan model based on the schema
const LoanModel = mongoose.model("Loan", LoanSchema)

module.exports = LoanModel
