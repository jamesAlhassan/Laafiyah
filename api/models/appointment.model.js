const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'should include a patient']
    },
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'should include a doctor']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'completed', 'declined', 'defered',
            'no_show', 'review', 'follow_up'],
        default: 'pending'
    },
    // appointmentDateTime: {
    //     type: Date,
    //     required: [true, 'please select a valid date']
    // },
    day: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true,
    },
    // duration: {
    //     type: Number,
    //     default: '2'
    // },
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