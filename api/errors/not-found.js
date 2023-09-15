const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api.js');

// Not found Error Class
class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;