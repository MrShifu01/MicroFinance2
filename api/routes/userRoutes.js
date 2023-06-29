const express = require('express') 
const router = express.Router()
const { getUsers, loginUser, registerUser, logoutUser, editUsers } = require('../controllers/userController')


router.get('/', getUsers)
router.put('/', editUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

module.exports = router