const Client = require('../models/Client.js')
const asyncHandler = require('../middleware/asyncHandler.js')

// A file that handles all the logic of various CRUD operations in regards to the Client data

// Function get all clients
// Route    GET /clients
// Access   Public
const getClients = asyncHandler(async (req, res) => {
  try {
    const clients = await Client.find()
    res.status(200).json(clients)
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error })
  }
});

// Function edit a clients
// Route    PUT /clients
// Access   Admin
const editClient = asyncHandler(async (req, res) => {
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

const clientInfo = {
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

  try {
    const updatedClient = await Client.updateOne(
      { _id: clientInfo.id },
      { $set: clientInfo }
    );
    res.status(200).json(updatedClient)
  } catch (error) {
    // Handle any errors that occur during the update
    console.log('Error updating client:', error)
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Function create a clients
// Route    POST /clients
// Access   Admin
const createClient = asyncHandler(async (req, res) => {
  try {
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

    const clientInfo = {
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
    const newClient = await Client.create(clientInfo)
    res.status(200).json(newClient)
  } catch (error) {
    res.status(400).json({ message: "Failed to create client", error })
  }
});

// Function delete a client
// Route    DELETE /clients/:id
// Access   Admin
const deleteClient = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const clientDoc = await Client.deleteOne({ _id: id })

    if (clientDoc.deletedCount === 0) {
      // If no client was deleted, return a 404 Not Found response
      return res.status(404).json({ message: 'Client not found' })
    }

    res.status(200).json({ message: 'Client deleted' })
  } catch (error) {
    // Handle any error that occurred during the deletion process
    console.log('Error deleting client:', error)
    res.status(500).json({ message: 'Failed to delete client' })
  }
});

module.exports = {
    getClients,
    createClient,
    editClient,
    deleteClient
}