const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Password Encryption
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

// Function Get all users
// Route    GET /users
// Access   Admin
const getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

// Function Register User
// Route    POST/users
// Access   Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, salt)
        })
        jwt.sign({email: userDoc.email, id:userDoc._id}, process.env.JWT_SECRET, {}, (error, token) => {
            if (error) throw error
            res.cookie('token', token).json(userDoc)
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

// Function Login
// Route    POST/users
// Access   Public
const loginUser = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const userDoc = await User.findOne({email})
        
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password)
            if (passOk) {
                jwt.sign({email: userDoc.email, id:userDoc._id}, process.env.JWT_SECRET, {}, (error, token) => {
                    if (error) throw error
                    res.cookie('token', token).json(userDoc)
                })
            }
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

// Function Login
// Route    POST/users
// Access   Public
const logoutUser = async (req, res) => {
    res.cookie('token', '').json('logged out')
}

module.exports = {
    getUsers,
    loginUser,
    logoutUser,
    registerUser
}