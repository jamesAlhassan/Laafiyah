// sends a 404 response with router not found message
const notFoundMiddleware = (req, res) => res.status(404).send('Router does not exist');
module.exports = notFoundMiddleware;