const DoctorAvailability = require('./doctorAvailabilityModel'); // Import your DoctorAvailability model

// Example: Create and save a doctor's availability for Monday
const createDoctorAvailability = async (doctorId, dayOfWeek, startTime, endTime) => {
  const availability = new DoctorAvailability({
    doctor: doctorId,
    availability: [
      {
        dayOfWeek,
        startTime,
        endTime,
      },
    ],
  });
  await availability.save();
  return availability;
};