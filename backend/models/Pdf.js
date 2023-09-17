const mongoose = require('mongoose');
const { Schema } = mongoose;
const Pdf = mongoose.model('Pdf', new mongoose.Schema({
  nameofpdf: { type: String, required: true },
  pdfowner: { type: String, required: true },
  pdfcontent: { type: String, required: true }, // Store base64-encoded PDF content
  }));

  module.exports = Pdf;

  