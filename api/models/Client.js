const mongoose = require('mongoose')

// Define the schema for the Client model
const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    idNumber: {
        type: String,
    },
    bank: {
        type: String,
    },
    accNumber: {
        type: String,
    },
    salaryDate: {
        type: String,
    },
    phone: {
        type: String,
    },
    badLender: {
        type: Boolean,
        default: false
    },
    office: {
        type: String,
        default: false
    },
    address: {
        type: String,
    },
    loans: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan'
    },
    industry: String,
    notes: String
}, { timestamps: true })

// Create the Client model based on the schema
const ClientModel = mongoose.model("Client", ClientSchema)

module.exports = ClientModel
