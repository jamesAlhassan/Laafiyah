const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PatientSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
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
    dob: {
        type: Date,
        required: [true, 'please enter your date of birth']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'please select a valid gender'
        }
    },
    location: {
        type: String,
        required: [true, 'please enter your location']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
},
    { timestamps: true }
);

// hash password with bcrypt before saving
PatientSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// method to compare passwords
PatientSchema.methods.comparePassword = async function(patientPassword){
    const isMatch = await bcrypt.compare(patientPassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('Patient', PatientSchema);