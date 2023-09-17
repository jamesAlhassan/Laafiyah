const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
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
    rating: {
        type: Number,
        min: 1, // Minimum rating value
        max: 5, // Maximum rating value
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);