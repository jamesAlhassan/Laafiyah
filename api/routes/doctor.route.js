const express = require('express');
const doctorRouter = express.Router();

const { addDoctor, getDoctor, updateDoctor,
    getAllDoctors, deleteDoctor, getDoctorByUserId } = require('../controllers/doctor.controller');
const authenticationMiddleware = require('../middleware/auth.middleware');

doctorRouter.route('/user').get(authenticationMiddleware, getDoctorByUserId);
doctorRouter.route('/').get(getAllDoctors).post(authenticationMiddleware, addDoctor);
doctorRouter.route('/:id').get(authenticationMiddleware, getDoctor)
    .patch(authenticationMiddleware, updateDoctor)
    .delete(authenticationMiddleware, deleteDoctor);

module.exports = doctorRouter;