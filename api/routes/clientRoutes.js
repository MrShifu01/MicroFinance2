const express = require('express') 
const router = express.Router()
const isAdminHandler = require('../middleware/isAdminHandler')
const {getClients, editClient, createClient, deleteClient} = require('../controllers/clientController.js')
const JWTHandler = require('../middleware/JWTHandler')

// Get all clients
router.get('/', getClients)

// Edit a client (AdminOnly)
router.put('/', JWTHandler, isAdminHandler, editClient);

// Create a new client (AdminOnly)
router.post('/', JWTHandler, isAdminHandler, createClient)

// Delete a client (AdminOnly)
router.delete('/:id', JWTHandler, isAdminHandler, deleteClient)

module.exports = router