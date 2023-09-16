const { StatusCodes } = require('http-status-codes');
const Appointment = require('../models/appointment.model');
const Patient = require('../models/patient.model');
const Doctor = require('../models/doctor.model');
const { NotFoundError, UnauthenticatedError, BadRequestError } = require('../errors');

// function to generate random date time (for testing only)
function generateRandomDate(from, to) {
    return new Date(
        from.getTime() +
        Math.random() * (to.getTime() - from.getTime()),
    );
}

// checks if user from the token is the doctor
async function isDoctor(userId, doctorId) {
    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor || doctor._id.toString() !== doctorId.toString()) return false;
    return true;
}

// checks if user from the token is the patient
async function isPatient(userId, patientId) {
    try {
        const patient = await Patient.findOne({ user: userId });
        if (!patient || patient._id.toString() !== patientId.toString()) return false;
        return true;
    } catch (error) {
        new BadRequestError(error.message);
    }
}

const addAppointment = async (req, res) => {
    // get user id 
    const { id } = req.user;

    // get patient using the id
    const patient = await Patient.findOne({ user: id });

    if (!patient) throw new NotFoundError('Please register first');

    // add patient id to the body
    req.body.patientRef = patient._id;

    // for testing only: add random date time from today
    req.body.appointmentDateTime = generateRandomDate(new Date(), new Date(2024, 0, 1));

    const appointment = await Appointment.create(req.body);
    res.status(StatusCodes.CREATED).json({ appointment });
}

const getAppointment = async (req, res) => {

    const user = req.user;

    const appointment = await Appointment.findOne({ _id: req.params.appointmentId });
    if (!appointment) throw new NotFoundError('Appointment not available');

    // make sure patient or doctor has right to view appointment
    const isDoctor_ = await isDoctor(user.id, appointment.doctorRef);
    if (user.role === 'doctor' && !isDoctor_)
        throw new UnauthenticatedError('You are not authorized to view this appointment');

    const isPatient_ = await isPatient(user.id, appointment.patientRef);
    if (user.role === 'patient' && !isPatient_)
        throw new UnauthenticatedError('You are not authorized to view this appointment');

    res.status(StatusCodes.OK).json({ appointment });
}

const updateAppointment = async (req, res) => {
    const user = req.user;
    const appointmentId = req.params.appointmentId;

    const appointment = await Appointment.findOne({ _id: appointmentId });
    if (!appointment) throw new NotFoundError('Appointment not found');

    // if user is doctor, make sure it's his appointment
    if (user.role === 'doctor') {
        const _isDoctor = await isDoctor(user.id, appointment.doctorRef);
        if (!_isDoctor) throw new UnauthenticatedError('You are not authorized to update this appointment');

        try {
            const updatedAppointment = await Appointment.findByIdAndUpdate(
                { _id: appointmentId },
                req.body,
                { new: true, runValidators: true }
            );
            res.status(StatusCodes.OK).json({ updatedAppointment });
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    }

    // if user is patient, make sure it's his appointment
    if (user.role === 'patient') {
        const _isPatient = await isPatient(user.id, appointment.patientRef);
        if (!_isPatient) throw new UnauthenticatedError('You are not authorized to update this appointment');
        try {
            const updatedAppointment = await Appointment.findByIdAndUpdate(
                { _id: appointmentId },
                req.body,
                { new: true, runValidators: true }
            );
            res.status(StatusCodes.OK).json({ updatedAppointment });
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    }
}

const getPatientsAppoinments = async (req, res) => {

    // make user patient has right to view appointments
    const _isPatient = await isPatient(req.user.id, req.params.patientId);
    if (!_isPatient) throw new UnauthenticatedError('You are not authorized to see the appointments');

    try {
        const appointments = await Appointment.find({ patientRef: req.params.patientId });
        res.send({ appointments, count: appointments.length })
    } catch (error) {
        new BadRequestError(error.message);
    }
}

const getDoctorsAppoinments = async (req, res) => {

    // make doctor has right to view appointments
    const _isDoctor = await isDoctor(req.user.id, req.params.doctorId);
    if (!_isDoctor) throw new UnauthenticatedError('You are not authorized to see the appointments');

    try {
        const appointments = await Appointment.find({ doctorRef: req.params.doctorId });
        res.send({ appointments, count: appointments.length })
    } catch (error) {
        new BadRequestError(error.message);
    }
}

// Not implemented yet. I don't thinkd an appointment should be deleted
const deleteAppointment = async (req, res) => { }

module.exports = {
    addAppointment,
    getAppointment,
    updateAppointment,
    getDoctorsAppoinments,
    getPatientsAppoinments
}