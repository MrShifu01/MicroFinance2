const express = require('express') 
const router = express.Router()
const { getUsers, loginUser, registerUser, logoutUser, editUsers, deleteUser, changeUserPassword } = require('../controllers/userController')
const JWTHandler = require('../middleware/JWTHandler')
const isAdminHandler = require('../middleware/isAdminHandler')
const changePasswordVerification = require('../middleware/changePasswordVerification')
const checkGmail = require('../middleware/checkGmail')

// Get all users (AdminOnly)
router.get('/', JWTHandler, isAdminHandler, getUsers)

// Register a new user
router.post('/register', checkGmail, registerUser)

// User Login
router.post('/login', loginUser)

// Edit users (AdminOnly)
router.put('/', JWTHandler, isAdminHandler, editUsers)

// Delete User (AdminOnly)
router.delete('/:id', JWTHandler, deleteUser)

// Change User Password (Current User Only)
router.put('/:id', JWTHandler, changePasswordVerification, changeUserPassword)

module.exports = router