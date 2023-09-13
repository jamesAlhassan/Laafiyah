const { StatusCodes } = require('http-status-codes');
const Patient = require('../models/patient.model');
const { NotFoundError } = require('../errors');

const addPatient = async (req, res) => {
    const data = req.body;
    // convert date from postman
    data.dob = new Date(data.dob);
    const patient = await Patient.create(data);
    res.status(StatusCodes.CREATED).json({ patient });
}

const getPatient = async (req, res, next) => {
    // get patient Id from req
    const { id } = req.params;
    const patient = await Patient.find({ _id: id });
    if (!patient || patient.length === 0) {
        throw new NotFoundError(`No patient with id ${id} found`);
    }
    res.status(StatusCodes.OK).json({ patient });
}

const getAllPatients = async (req, res) => {
    const patients = await Patient.find({});
    res.status(StatusCodes.OK).json({ patients, count: patients.length })
}

const updatePatient = async (req, res) => {
    const { body, params: { id } } = req;
    const patient = await Patient.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true, runValidators: true }
    );

    if (!patient) {
        throw new NotFoundError(`No patient with id ${id} found`);
    }

    res.status(StatusCodes.OK).json({ patient });
}

const deletePatient = async (req, res) => {
    const { id } = req.params;

    const patient = await Patient.findByIdAndRemove({ _id: id });
    if (!patient) throw new NotFoundError(`No patient with id ${id} found`);
    res.status(StatusCodes.OK).send();
}


module.exports = {
    addPatient,
    getPatient,
    getAllPatients,
    updatePatient,
    deletePatient
}