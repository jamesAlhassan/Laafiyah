const User = require('../models/user.model');
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    const { email } = req.body;
    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        // User with the same email already exists
        throw new BadRequestError('Email already exists. Please use a different email.');
    }

    // If the user does not exist, proceed with registration
    const user = await User.create({ ...req.body });

    const token = user.createJWT();
    res.cookie("accessToken", token);
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            role: user.role,
            user: user._id,
            token
        }
    });
}

const deleteUser = async (req, res) => {
    // make sure the userr has the right to delete
    const { id } = req.params;

    // check if user exist
    const existingUser = await User.findOne({ _id: id });
    if (!existingUser) throw new NotFoundError(`No user with id ${id} found`);

    const user = await User.findByIdAndRemove({ _id: id });
    res.status(StatusCodes.OK).send();
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

    res.cookie("accessToken", token).status(StatusCodes.OK).json({
        user: {
            email: user.email,
            role: user.role,
            user: user._id,
            token
        }
    })
}

const logout = async (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    })
        .status(200)
        .send('User logged out');
};

module.exports = {
    register,
    login,
    deleteUser,
    logout
};