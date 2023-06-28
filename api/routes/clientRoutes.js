const express = require('express') 
const router = express.Router()
const {getClients, editClient, createClient} = require('../controllers/clientController.js')

router.get('/', getClients)
router.put('/', (req, res) => {
    const { 
        id, 
        name, 
        idNumber, 
        address, 
        notes, 
        settled, 
        bank, 
        accNumber, 
        salaryDate, 
        phone, 
        badLender, 
        office,
        industry
    } = req.body

    const userInfo = {
        id, 
        name, 
        idNumber, 
        address, 
        notes, 
        settled, 
        bank, 
        accNumber, 
        salaryDate, 
        phone, 
        badLender, 
        office,
        industry
    }

    editClient(userInfo, req, res)
})
router.post('/', (req, res) => {
    const { 
        name, 
        idNumber, 
        address, 
        notes, 
        settled, 
        bank, 
        accNumber, 
        salaryDate, 
        phone, 
        badLender, 
        office,
        industry
    } = req.body

    const userInfo = {
        name, 
        idNumber, 
        address, 
        notes, 
        settled, 
        bank, 
        accNumber, 
        salaryDate, 
        phone, 
        badLender, 
        office,
        industry
    }

    createClient(userInfo, req, res)
})

module.exports = router