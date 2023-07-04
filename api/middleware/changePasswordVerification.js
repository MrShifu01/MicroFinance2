// Middleware function to verify and validate password change request
function changePasswordVerification(req, res, next) {
    // Check if the new password matches the confirmation password and has a minimum length of 6 characters
    if (
      req.body.newPassword == req.body.confirmPassword &&
      req.body.newPassword.length >= 6
    ) {
      // Store the new password in the request object
      req.newUserpassword = req.body.newPassword
      next() // Move to the next middleware or route handler
    } else if (req.body.newPassword.length < 6) {
      // If the new password is less than 6 characters, send a 400 Bad Request response
      res.status(400).send({
        message: "The new password needs to be longer than six characters.",
      })
      next() // Move to the next middleware or route handler
    } else {
      // If the confirmation password and new password do not match, send a 400 Bad Request response
      res.status(400).send({
        message: "Confirmation Password and New Password do not match.",
      })
      next() // Move to the next middleware or route handler
    }
  }
  
  module.exports = changePasswordVerification
  