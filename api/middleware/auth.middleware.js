const { UnauthenticatedError } = require('../errors');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) throw new UnauthenticatedError('Authentication invalid');

    // get token from header and verify it
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // get user without password
        const user = User.findById(payload.id).select('-password');

        req.user = { id: payload.id, email: payload.email, role: payload.role};
        console.log("req.user", req.user);
        next();
    } catch(error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
}

module.exports = authenticationMiddleware;