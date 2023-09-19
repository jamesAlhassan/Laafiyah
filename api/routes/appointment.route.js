const express = require('express');
const router = express.Router();

const { addAppointment, getAppointment, updateAppointment,
    getDoctorsAppoinments, getPatientsAppoinments } = require('../controllers/appointment.controller');

router.route('/').post(addAppointment);
router.route('/:appointmentId').get(getAppointment).patch(updateAppointment);
router.route('/doctor/:doctorId').get(getDoctorsAppoinments);
router.route('/patient/:patientId').get(getPatientsAppoinments);

module.exports = router;