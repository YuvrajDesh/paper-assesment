const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const { Readable } = require('stream');
const { gfs } = require('../db'); // Import the gfs instance from your db.js file
const Grid = require('gridfs-stream');
const { connectMongo } = require('../db');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Import your Pdf model (replace with the actual import)
const Pdf = require('../models/Pdf');


router.post('/addpdf',upload.array('pdfcontent',5), async (req, res) => {
  try {
    console.log(req.body)
    const { nameofpdf, pdfowner } = req.body;
    console.log(req.files)
    const pdfcontents = req.files.map((file) => {
      return { nameofpdf, pdfowner, pdfcontent: file.buffer };
    });

    if (!pdfcontents.every((pdf) => pdf.nameofpdf && pdf.pdfowner && pdf.pdfcontent)) {
      return res.status(400).json({ error: 'Please provide all required fields for each PDF' });
    }

    const insertResults = await Pdf.insertMany(pdfcontents);

    res.json({ message: 'PDF files uploaded successfully', results: insertResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
