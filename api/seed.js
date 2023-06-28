const express = require('express')
const connectDB = require('./config/db.js')
require('dotenv').config()
const colors = require('colors')
const Client = require('./models/Client.js')
const clients = require('./data/clients.js')
const User = require('./models/User.js')
const users = require('./data/users.js')
const Loan = require('./models/Loan.js')
const loans = require('./data/loans.js')

connectDB()

const importData = async () => {
    try {

        await Client.deleteMany()
        await Client.insertMany(clients)

        await User.deleteMany()
        await User.insertMany(users)

        await Loan.deleteMany()
        await Loan.insertMany(loans)

        console.log("Data Imported!".green.inverse)
        process.exit()

    } catch (error) {

        console.log(`${error}`.red.inverse)
        process.exit(1)

    }
}

const destroyData = async () => {
    try {
        await Client.deleteMany()
        await User.deleteMany()
        console.log(`Data Deleted!`.red.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}