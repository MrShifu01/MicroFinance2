const express = require('express');
const connectDB = require('./config/db.js');
require('dotenv').config();
const colors = require('colors');
const Client = require('./models/Client.js');
const clients = require('./data/clients.js');
const User = require('./models/User.js');
const users = require('./data/users.js');
const Loan = require('./models/Loan.js');
const loans = require('./data/loans.js');

// This file is used to populate the database with dummy data and to clear out the database if needed. 

// Connect to the database
connectDB();

// Import data from data files
const importData = async () => {
    try {
        // Delete existing data
        await Client.deleteMany();
        await User.deleteMany();
        await Loan.deleteMany();

        // Insert new data
        await Client.insertMany(clients);
        await User.insertMany(users);
        await Loan.insertMany(loans);

        console.log("Data Imported!".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Delete all data
const destroyData = async () => {
    try {
        await Client.deleteMany();
        await User.deleteMany();

        console.log("Data Deleted!".red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Check command line arguments
if (process.argv[2] === '-d') {
    destroyData(); // Delete data
} else {
    importData(); // Import data
}
