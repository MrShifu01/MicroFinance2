const mongoose = require('mongoose')

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

// Create the User model based on the schema
const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel
