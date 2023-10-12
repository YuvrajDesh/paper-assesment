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


router.post('/addpdf', upload.array('pdfcontent', 10), async (req, res) => {
  
  try {
    const { stream, subject, exam , pdfcontent ,selectedUserId } = req.body;
    
    
    if (!stream || !subject || !exam || !pdfcontent || !selectedUserId ) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const pdf = new Pdf({ stream, subject, exam , pdfcontent ,selectedUserId});
    
    await pdf.save();

    res.json({ message: 'PDF file uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
