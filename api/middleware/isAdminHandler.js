const isAdminHandler = (req, res, next) => {
    // Retrieve the user's role from the JWT token
    const { isAdmin } = req.user
  
    // Check if the user is an admin
    if (!isAdmin) {
      // If the user is not an admin, return a 403 Forbidden response
      return res.status(403).json({ message: "You are not authorized to perform this operation." })
    }
    // If the user is an admin, proceed to the next middleware or the route handler
    next()
  }
  
  module.exports = isAdminHandler
  