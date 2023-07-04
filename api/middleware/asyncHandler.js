// Middleware function to handle asynchronous operations and error handling
const asyncHandler = fn => (req, res, next) => {
  // Wrap the promise returned by the handler function in a `Promise.resolve` to handle both resolved and rejected promises
  Promise.resolve(fn(req, res, next))
    // If the promise is resolved, move to the next middleware or route handler
    .catch(next) // If the promise is rejected, pass the error to the error handling middleware
};

module.exports = asyncHandler
