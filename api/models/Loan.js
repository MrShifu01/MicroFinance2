const mongoose = require('mongoose')

const LoanSchema = new mongoose.Schema ({
    idNumber: {type:String, ref: "Client", required: true},
    loanDate: Date,
    repaymentDate: Date, // Auto fill on form for salary date
    loanAmount: Number,
    repaymentAmount: Number,
    settled: {type: Boolean, default: false},
    notes: String,
}, {timestamps:true})

const LoanModel = mongoose.model("Loan", LoanSchema)

module.exports = LoanModel