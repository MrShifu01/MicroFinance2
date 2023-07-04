const mongoose = require('mongoose')

// Define the schema for the Client model
const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    accNumber: {
        type: String,
        required: true
    },
    salaryDate: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    badLender: {
        type: Boolean,
        default: false
    },
    office: {
        type: String,
        required: true,
        default: false
    },
    address: {
        type: String,
        required: true
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
