const { StatusCodes } = require('http-status-codes');
const Doctor = require('../models/doctor.model');
const { NotFoundError } = require('../errors');

const addDoctor = async (req, res) => {
    const data = req.body;
    // convert date from postman
    data.dob = new Date(data.dob);
    const doctor = await Doctor.create(data);
    res.status(StatusCodes.CREATED).json({ doctor });
}

const getDoctor = async (req, res, next) => {
    // get doctor Id from req
    const { id } = req.params;
    const doctor = await Doctor.find({ _id: id });
    if (!doctor || doctor.length === 0) {
        throw new NotFoundError(`No doctor with id ${id} found`);
    }
    res.status(StatusCodes.OK).json({ doctor });
}

const getAllDoctors = async (req, res) => {
    const doctors = await Doctor.find({});
    console.log(doctors);
    res.status(StatusCodes.OK).json({ doctors, count: doctors.length })
}

const updateDoctor = async (req, res) => {
    const { body, params: { id } } = req;
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
    const { id } = req.params;

    const doctor = await Doctor.findByIdAndRemove({ _id: id });
    if (!doctor) throw new NotFoundError(`No doctor with id ${id} found`);
    res.status(StatusCodes.OK).send();
}


module.exports = {
    addDoctor,
    getDoctor,
    getAllDoctors,
    updateDoctor,
    deleteDoctor
}