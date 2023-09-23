const { StatusCodes } = require('http-status-codes');
const { UnauthenticatedError, BadRequestError, NotFoundError } = require('../errors');
const Availability = require('../models/availability.model');
const Doctor = require('../models/doctor.model');

// const createDoctorAvailab = async (doctorId, date, startTime, endTime) => {
//   const availability = new Availability({
//     doctor: doctorId,
//     availability: [
//       {
//         dayOfWeek: date,
//         startTime,
//         endTime,
//       },
//     ],
//   });
//   await availability.save();
//   return availability;
// };

const createAvailability = async (req, res) => {

  const { id, role } = req.user;
  const { doctorId } = req.params;
  if (role !== 'doctor') throw new UnauthenticatedError('You can not create availability');

  try { // check if doctor has availability
    const oldAvailability = await Availability.find({ doctor: doctorId });

    // add doctor id to the body
    req.body.doctor = doctorId;

    const availability = await Availability.create(req.body);
    res.status(StatusCodes.CREATED).json({ availability });

  } catch (error) {
    throw new BadRequestError(error);
  }
}

const getAvailabilities = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const availability = await Availability.findOne({ doctor: doctorId });

    if (!availability) throw new NotFoundError('No availability found for the doctor');

    res.status(StatusCodes.OK).json(availability);
  } catch (error) {
    throw new BadRequestError(error);
  }
}

const updateAvailability = async (req, res) => {
  const { id } = req.params;

  // get doctor and compare the userId to the userId from the token
  const doctor = await Doctor.findOne({ user: req.user.id });
  if (!doctor) throw new NotFoundError(`No doctor with id ${id} found`);

  try {
    const availability = await Availability.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({ availability });
  } catch (error) {
    throw new BadRequestError(error);
  }
}

module.exports = {
  createAvailability,
  getAvailabilities,
  updateAvailability
}