const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patientRef: {
        type: mongoose.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'should include a patient'],
        unique: true
    },
    doctorRef: {
        type: mongoose.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'should include a doctor']
    },
    status: {
        type: String,
        enum: ['pending', 'scheduled', 'completed', 'declined', 'defered',
            'no_show', 'review', 'follow_up'],
        default: 'pending'
    },
    appointmentDateTime: {
        type: Date,
        required: [true, 'please select a valid date']
    },
    duration: {
        type: Number,
        default: '2'
    },
    notes: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);