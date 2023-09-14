const { StatusCodes } = require('http-status-codes');
const Doctor = require('../models/doctor.model');
const { NotFoundError, BadRequestError, UnauthenticatedError } = require('../errors');

const addDoctor = async (req, res) => {
    const { id, role } = req.user;

    // you can not add a doctor if you are not a doctor
    if (!(role === 'doctor' || role === 'admin'))
        throw new UnauthenticatedError('You are not authorized to add a doctor');

    // check if doctor is already added
    const oldDoctor = await Doctor.findOne({ user: id });
    if (oldDoctor) throw new UnauthenticatedError('Doctor already registered');

    // add the userId to the body
    req.body.user = id;

    // convert date from postman
    req.body.dob = new Date(req.body.dob);
    const doctor = await Doctor.create(req.body);
    res.status(StatusCodes.CREATED).json({ newDoctor: doctor });
}

const getDoctor = async (req, res, next) => {
    // get doctor Id from req params (NB: )
    const { id } = req.params;
    const doctor = await Doctor.find({ _id: id });
    if (!doctor || doctor.length === 0) {
        throw new NotFoundError(`No doctor with id ${id} found`);
    }
    res.status(StatusCodes.OK).json({ doctor });
}

const getAllDoctors = async (req, res) => {
    const doctors = await Doctor.find({});
    res.status(StatusCodes.OK).json({ doctors, count: doctors.length })
}

const updateDoctor = async (req, res) => {
    // make sure the doctor has the right to update his profile
    const { body, params: { id }, user: { id: userId } } = req;

    const oldDoctor = await Doctor.findOne({ _id: id });
    if (oldDoctor.user.toString() !== userId)
        throw new UnauthenticatedError('You are not authorized to update this doctor');


    const doctor = await Doctor.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true, runValidators: true }
    );

    if (!doctor) {
        throw new NotFoundError(`No doctor with id ${id} found`);
    }

    res.status(StatusCodes.OK).json({ doctor });
}

const deleteDoctor = async (req, res) => {
    // make sure the doctor has the right to delete his profile
    const { id } = req.params;

    const oldDoctor = await Doctor.findOne({ _id: id });
    if (oldDoctor.user.toString() !== req.user.id)
        throw new UnauthenticatedError('You are not authorized to delete this doctor');

    const doctor = await Doctor.findByIdAndRemove({ _id: id });
    if (!doctor) throw new NotFoundError(`No doctor with id ${id} found`);
    res.status(StatusCodes.OK).send();
}

module.exports = {
    addDoctor,
    getDoctor,
    getAllDoctors,
    updateDoctor,
    deleteDoctor,
}