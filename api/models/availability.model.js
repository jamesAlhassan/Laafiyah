const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvailabilitySchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor', // Reference to the Doctor model
    required: [true, 'should include a doctor'],
    unique: true,
  },
  availability: [
    {
      day: {
        type: String,
        required: true,
        enum: {
          values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          message: 'please add a day',
        },
      },
      timeslots: [
        {
          type: String,
          required: true,
        }
      ],
    },
  ],
});

module.exports = mongoose.model('Availability', AvailabilitySchema)
