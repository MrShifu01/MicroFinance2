// Middleware function to check if an email address is a Gmail address
function checkGmail(req, res, next) {
    // Extract the email from the request body
    const { email } = req.body
  
    // Check if the email ends with '@gmail.com'
    if (email.endsWith('@gmail.com')) {
      next() // Move to the next middleware or route handler
    } else {
      // If the email is not a Gmail address, send a 400 Bad Request response
      res.status(400).json("Must be a Gmail address")
    }
  }
  
  module.exports = checkGmail
  