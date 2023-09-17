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


router.post('/addpdf',  async (req, res) => {
  
  try {
    const { nameofpdf, pdfowner, pdfcontent } = req.body;

    if (!nameofpdf || !pdfowner || !pdfcontent) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const pdf = new Pdf({ nameofpdf, pdfowner, pdfcontent });
    
    await pdf.save();

    res.json({ message: 'PDF file uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
