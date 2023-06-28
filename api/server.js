// Imports
const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const clientRoutes =require('./routes/clientRoutes.js')
const userRoutes =require('./routes/userRoutes.js')
const loanRoutes =require('./routes/loanRoutes.js')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
// NEED TO ADD THE CSV PARSER OR MAYBE ON THE FRONTEND


// Configurations
const PORT = process.env.PORT || 8000 
connectDB()
const app = express()


// Middleware
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// Routes
app.use('/clients', clientRoutes)
app.use('/loans', loanRoutes)
app.use('/users', userRoutes)

// Test Route
app.get('/', (req, res) => {
    res.json("API is working!")
})

app.listen(8000, () => {
    console.log(`Server running`)
})