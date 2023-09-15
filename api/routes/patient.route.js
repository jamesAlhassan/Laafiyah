const express = require('express');
const patientRouter = express.Router();

const { addPatient, getPatient, updatePatient, getAllPatients, deletePatient } = require('../controllers/patient.controller');

patientRouter.route('/').get(getAllPatients).post(addPatient);
patientRouter.route('/:id').get(getPatient).patch(updatePatient).delete(deletePatient);

module.exports = patientRouter;