const User = require('../models/user.model');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });

    const token = user.createJWT();
    console.log("token created", token)
    res.status(StatusCodes.CREATED).json({ user: { email: user.email }, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) throw new BadRequestError('Please provide an email...');
    if (!password) throw new BadRequestError('Please provide password...');

    const user = await User.findOne({ email });
    if (!user) throw new UnauthenticatedError('User not found');

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new UnauthenticatedError('Wrong password');

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        user: {
            email: user.email,
            token
        }
    })
}

module.exports = {
    register,
    login
};