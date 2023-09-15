const express = require('express');
const router = express.Router();

const { addAppointment, getAppointment, updateAppointment,
    deleteAppointment, getDoctorsAppoinments, getPatientsAppoinments } = require('../controllers/appointment.controller');

router.route('/').post(addAppointment);
router.route('/:appointmentId').get(getAppointment).patch(updateAppointment).delete(deleteAppointment);
router.route('/:id').get(getDoctorsAppoinments).get(getPatientsAppoinments)

module.exports = router;