// blueprint for all error messages
class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = CustomAPIError;