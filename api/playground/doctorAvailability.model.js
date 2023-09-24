const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorAvailabilitySchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor', // Reference to the Doctor model
    required: true,
  },
  availability: [
    {
      dayOfWeek: {
        type: String, // Store the day of the week (e.g., "Monday", "Tuesday")
        required: true,
      },
      startTime: {
        type: String, // Store the start time for appointments (e.g., "09:00 AM")
        required: true,
      },
      endTime: {
        type: String, // Store the end time for appointments (e.g., "05:00 PM")
        required: true,
      },
    },
    // Add more objects for additional availability slots
  ],
  // Add any other fields you need for doctor availability
});

const DoctorAvailability = mongoose.model('DoctorAvailability', doctorAvailabilitySchema);

module.exports = DoctorAvailability;