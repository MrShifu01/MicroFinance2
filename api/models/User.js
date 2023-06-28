const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps:true})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel