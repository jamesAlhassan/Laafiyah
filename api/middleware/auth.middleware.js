const { UnauthenticatedError } = require('../errors');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {

    // get token from browser and verify it
    const token = req.cookies.accessToken;
    if (!token) throw new UnauthenticatedError('Authentication invalid');
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // get user without password
        const user = User.findById(payload.id).select('-password');

        req.user = { id: payload.id, email: payload.email, role: payload.role };
        next();
    } catch (error) {
        throw new UnauthenticatedError(`Authentication invalid: ${error.message}`);
    }
}

module.exports = authenticationMiddleware;