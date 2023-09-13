const express = require('express');
const doctorRouter = express.Router();

const { addDoctor, getDoctor, updateDoctor, getAllDoctors, deleteDoctor } = require('../controllers/doctor.controller');

doctorRouter.route('/').get(getAllDoctors).post(addDoctor);
doctorRouter.route('/:id').get(getDoctor).patch(updateDoctor).delete(deleteDoctor);

module.exports = doctorRouter;