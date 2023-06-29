const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    name: {
        type: String, 
        req: true
    },
    idNumber: {
        type: String, 
        req: true
    },
    bank: {
        type: String, 
        req: true
    },
    accNumber: {
        type: String, 
        req: true
    },
    salaryDate: {
        type: String, 
        req: true
    },
    phone: {
        type: String, 
        req: true
    },
    badLender: {type: Boolean, default: false},
    office: {
        type: String, 
        req: true,
        default: false
    },
    address: {
        type: String, 
        req: true
    },
    loans: {type:mongoose.Schema.Types.ObjectId, ref:'Loan'},
    industry: String,

    notes: String,

}, {timestamps:true})

const ClientModel = mongoose.model("Client", ClientSchema)

module.exports = ClientModel