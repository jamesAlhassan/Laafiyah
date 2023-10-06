import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user'],
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);