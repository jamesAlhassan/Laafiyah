import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        doctor: {
            type: mongoose.Types.ObjectId,
            ref: 'Doctor',
            required: [true, 'Please provide a doctor'],
            unique: true,
        },
        patient: {
            type: mongoose.Types.ObjectId,
            ref: 'Patient',
            required: [true, 'Please provide a patient'],
            unique: true,
        },
        readByDoctor: {
            type: Boolean,
            required: true,
        },
        readByPatient: {
            type: Boolean,
            required: true,
        },
        lastMessage: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
