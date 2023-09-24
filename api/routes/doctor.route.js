const express = require('express');
const doctorRouter = express.Router();

const { addDoctor, getDoctor, updateDoctor,
    getAllDoctors, deleteDoctor } = require('../controllers/doctor.controller');
const authenticationMiddleware = require('../middleware/auth.middleware');

doctorRouter.route('/').get(getAllDoctors).post(addDoctor);
doctorRouter.route('/:id').get(authenticationMiddleware, getDoctor)
    .patch(authenticationMiddleware, updateDoctor)
    .delete(authenticationMiddleware, deleteDoctor);

module.exports = doctorRouter;