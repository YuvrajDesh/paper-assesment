// PdfUploadForm.js
// http://localhost:5000/api/pdfs/addpdf
import React, { useState } from 'react';
function PdfUploadForm() {
  const [nameofpdf, setNameOfPdf] = useState('');
  const [pdfowner, setPdfOwner] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleNameOfPdfChange = (event) => {
    setNameOfPdf(event.target.value);
  };

  const handlePdfOwnerChange = (event) => {
    setPdfOwner(event.target.value);
  };
  const handleUpload = async () => {
    try {
      if (!nameofpdf || !pdfowner || !selectedFile) {
        alert('Please fill in all required fields');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = async () => {
        const pdfcontent = reader.result;

        const formData = new FormData();
        formData.append('nameofpdf', nameofpdf);
        formData.append('pdfowner', pdfowner);
        formData.append('pdfcontent', pdfcontent);

        const response = await fetch('http://localhost:5000/api/pdfs/addpdf', {
          method: 'POST',
          body: JSON.stringify({ nameofpdf, pdfowner, pdfcontent }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert('PDF uploaded successfully');
        } else {
          alert('Error uploading PDF');
        }
      };
    } catch (error) {
      console.error(error);
      alert('Error uploading PDF');
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <input type="text" placeholder="Name of PDF" onChange={handleNameOfPdfChange} />
      <input type="text" placeholder="PDF Owner" onChange={handlePdfOwnerChange} />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default PdfUploadForm;
