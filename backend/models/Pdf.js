const mongoose = require('mongoose');
const { Schema } = mongoose;
const Pdf = mongoose.model('Pdf', new mongoose.Schema({
  selectedUserId: {
    type: Schema.Types.ObjectId, // Use ObjectId to reference the User model
    ref: 'user', // Reference the User model
    required: true,
  },
  stream: { type: String, required: true },
  subject: { type: String, required: true },
  exam: { type: String, required: true },
  pdfcontent: { type: String, required: true }, // Store base64-encoded PDF content
  date: { type: Date, default: Date.now },

  }));

  module.exports = Pdf;

  