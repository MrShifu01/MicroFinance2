const Client = require('../models/Client.js')

// Function get all clients
// Route    GET /clients
// Access   Public
const getClients = async (req, res) => {
    const clients = await Client.find()
    res.status(200).json(clients)
}

// Function edit a clients
// Route    PUT /clients
// Access   Admin
const editClient = async (clientInfo, req, res) => {
    const updatedClient = await Client.updateOne(
      { _id: clientInfo.id },
      { $set: clientInfo }
    );
    res.status(200).json(updatedClient);
  };

// Function create a clients
// Route    POST /clients
// Access   Admin
const createClient = async (clientInfo, req, res) => {
    const newClient = await Client.create(clientInfo)
    res.status(200).json(newClient);
  };
  

module.exports = {
    getClients,
    createClient,
    editClient
}