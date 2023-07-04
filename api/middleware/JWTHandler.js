const jwt = require('jsonwebtoken')

// Middleware function to handle JWT authentication
function JWTHandler(req, res, next) {
  // Check if a token is attached to the request
  if (req.cookies.token) {
    const token = req.cookies.token
    // Verify the token using the JWT_SECRET
    jwt.verify(token, process.env.JWT_SECRET, function (error, data) {
      if (error) {
        // If the token is invalid, send a 401 Unauthorized response
        res.status(401).json({ message: "Invalid Token" })
      } else {
        // If the token is valid, set the decoded data to req.user
        req.user = data
        next(); // Move to the next middleware or route handler
      }
    })
  } else {
    // If no token is attached to the request, send a 401 Unauthorized response
    res.status(401).json({ message: "No token attached to the request" })
  }
}

module.exports = JWTHandler
