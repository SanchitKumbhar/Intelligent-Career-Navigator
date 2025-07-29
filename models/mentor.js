const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true
  },
  domain: {
    type: String,
    maxlength: 100
  },
  college: {
    type: String,
    maxlength: 100
  },
  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Mentor', mentorSchema);