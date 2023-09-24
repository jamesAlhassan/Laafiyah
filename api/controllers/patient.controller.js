const { StatusCodes } = require('http-status-codes');
const Patient = require('../models/patient.model');
const { NotFoundError, UnauthenticatedError } = require('../errors');

const addPatient = async (req, res) => {
    const { id, role } = req.user;

    // you can not add a patient if you are not a patient
    if (!(role === 'patient' || role === 'admin'))
        throw new UnauthenticatedError('You are not authorized to add a patient');

    // check if patient is already added
    const oldPatient = await Patient.findOne({ user: id });
    if (oldPatient) throw new UnauthenticatedError('Patient already registered');

    // add the userId to the body
    req.body.user = id;

    // convert date from postman
    req.body.dateOfBirth = new Date(req.body.dateOfBirth);
    const patient = await Patient.create(req.body);
    res.status(StatusCodes.CREATED).json({ patient });
}

const getPatient = async (req, res, next) => {
    // get user from req.user (token)
    const { id: userId, role } = req.user;
    // get patient Id from req
    const { id } = req.params;

    const patient = await Patient.findOne({ _id: id });
    if (!patient || patient.length === 0) {
        throw new NotFoundError(`No patient with id ${id} found`);
    }

    if (role === 'patient' && patient.user.toString() !== userId)
        throw new UnauthenticatedError('You are not authorized to access this patient');

    res.status(StatusCodes.OK).json({ patient });
}

const getAllPatients = async (req, res) => {
    // NB: only admin should be able to get all patients
    const { role } = req.user;
    console.log(role)

    if (role !== 'admin') throw new UnauthenticatedError("You are not authorized to view patients");
    
    const patients = await Patient.find({});
    res.status(StatusCodes.OK).json({ patients, count: patients.length })
}

const updatePatient = async (req, res) => {
    // make sure the patient has to right to update his profile
    const { body, params: { id }, user: { id: userId } } = req;

    // get patient and compare the userId to the userId from the token
    const oldPatient = await Patient.findOne({ _id: id });
    if (!oldPatient) throw new NotFoundError(`No patient with id ${id} found`);
    if (oldPatient.user.toString() !== userId)
        throw new UnauthenticatedError('You are not authorized to edit this patient');

    const patient = await Patient.findByIdAndUpdate(
        { _id: id },
        body,
        { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({ patient });
}

const deletePatient = async (req, res) => {
    // make sure the patient has the right to delete his/her profile
    const { id } = req.params;

    // get patient and compare the userId to the userId from the token
    const oldPatient = await Patient.findOne({ _id: id });
    if (!oldPatient) throw new NotFoundError(`No patient with id ${id} found`);
    if (oldPatient.user.toString() !== req.user.id)
        throw new UnauthenticatedError('You are not authorized to delete this patient');

    const patient = await Patient.findByIdAndRemove({ _id: id });
    res.status(StatusCodes.OK).send();
}


module.exports = {
    addPatient,
    getPatient,
    getAllPatients,
    updatePatient,
    deletePatient
}