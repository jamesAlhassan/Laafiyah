const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user'],
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, 'please provide a name'],
        maxlength: 50,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: [true, 'please provide a name'],
        maxlength: 50,
        minlength: 3,
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'please enter your date of birth']
    },
    gender: {
        type: String,
        required: [true, 'please provide a gender'],
        enum: {
            values: ['male', 'female'],
            message: 'please select a valid gender'
        }
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide phone number'],
        match: [
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
            'Please provide a valid phone number',
        ],
        unique: true,
    },
    
    location: {
        type: String,
        required: [true, 'please enter your location']
    },
    specialities: {
        type: [String],
    },
    licenseNumber: {
        type: String,
        required: [true, 'Please provide your license number'],
        unique: true
    },
    hospitalAffiliation: {
        type: String,
        required: [true, 'Please provide your hospital affiliation'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Doctor', DoctorSchema);