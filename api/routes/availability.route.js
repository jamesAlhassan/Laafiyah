const express = require('express');
const availabilityRouter = express.Router();

const { createAvailability, getAvailabilities, updateAvailability } =  require('../controllers/availability.controller');

availabilityRouter.route('/:doctorId').post(createAvailability).get(getAvailabilities);
availabilityRouter.route('/:id').patch(updateAvailability);

module.exports = availabilityRouter;