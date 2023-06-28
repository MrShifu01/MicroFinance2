const express = require('express') 
const router = express.Router()
const { getUsers, loginUser, registerUser, logoutUser } = require('../controllers/userController')


router.get('/', getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

module.exports = router