const jwt = require('jsonwebtoken')

function JWTHandler(req, res, next) {
  if (req.cookies.token) {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, function (error, data) {
      if (error) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.user = data; // Set the decoded data to req.user
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token attached to the request" });
  }
}

module.exports = JWTHandler;
