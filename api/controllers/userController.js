const User = require('../models/User')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../middleware/asyncHandler.js')

// A file that handles all the logic of various CRUD operations in regards to the User data

// Password Encryption
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

// Function Get all users
// Route    GET /users
// Access   Admin
const getUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users" })
    }
  });
  
// Function Register User
// Route    POST /users
// Access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    // Password validation for registering user
    if(password.length < 6) {
      throw error
    }
    try {
      // See if email is already in use
      const userExists = await User.findOne({ email })
      if (userExists) {
        res.status(400).json({ message: "User already exists" })
      } else {
        const userDoc = await User.create({
          name,
          email,
          password: bcrypt.hashSync(password, salt),
        })
        // After user registers, automatically log them in and create a JWT
        jwt.sign(
          { email: userDoc.email, id: userDoc._id, isAdmin: userDoc.isAdmin },
          process.env.JWT_SECRET,
          {},
          (error, token) => {
            if (error) throw error;
            res.json({token: token}).json(userDoc)
          }
        )
      }
    } catch (error) {
      res.status(500).json({ message: "Error registering user" })
    }
  })
  
// Function Login
// Route    POST /users
// Access   Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    try {
      const userDoc = await User.findOne({ email })
  
      if (!userDoc) {
        res.status(400).json({ message: "Invalid email or password" })
      } else {
        // Use Bcrypt to compare the passwords, hashed. 
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (!passOk) {
          res.status(400).json({ message: "Invalid email or password" })
        } else {
          // Create a JWT for the signed in user
          jwt.sign(
            { email: userDoc.email, id: userDoc._id, isAdmin: userDoc.isAdmin },
            process.env.JWT_SECRET,
            {},
            (error, token) => {
              if (error) {
                res.status(500).json({ message: "Error signing the token" })
              } else {
                // Send the JWT via a json
                res.json({token: token}).json(userDoc)
              }
            }
          )
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Error logging in" });
    }
  });

// Function Edit Users (Specifically for admin users to be able to set other users as admin also)
// Route    PUT/users
// Access   Admin
const editUsers = asyncHandler(async (req, res) => {
    const users = req.body;

    // Use Bulk Update when a bunch of documents need to be updated at once
    const bulkUpdate = users.map((user) => ({
      updateOne: {
        filter: { _id: user._id },
        update: { $set: { isAdmin: user.isAdmin } },
        upsert: true,
      },
    }))
  
    try {
      await User.bulkWrite(bulkUpdate)
      res.status(200).json("Users updated successfully")
    } catch (error) {
      console.error("Error updating users:", error)
      res.status(500).json("Failed to update users")
    }
  })

// Function delete a user
// Route    DELETE /users
// Access   Admin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const userDoc = await User.deleteOne({ _id: id })

    if (userDoc.deletedCount === 0) {
      // If no User was deleted, return a 404 Not Found response
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    // Handle any error that occurred during the deletion process
    console.log('Error deleting User:', error)
    res.status(500).json({ message: 'Failed to delete User' })
  }
  });

// Function change a users password
// Route    PUT /users
// Access   Current User
const changeUserPassword = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { newUserpassword } = req.body

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newUserpassword, salt)

    // Update the user's password in the database
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.password = hashedPassword;
    await user.save()

    res.status(200).json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Error updating password:', error)
    res.status(500).json({ message: 'Failed to update password' })
  }
  })

module.exports = {
    getUsers,
    loginUser,
    registerUser,
    editUsers,
    deleteUser,
    changeUserPassword
}