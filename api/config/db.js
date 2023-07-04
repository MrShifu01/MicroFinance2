const mongoose = require('mongoose')

// Async function to Connect to MongoDB and my database, Error handling included
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error}`)
        process.exit(1)
    }
}

module.exports =  connectDB