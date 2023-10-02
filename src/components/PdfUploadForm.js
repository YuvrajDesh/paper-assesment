// PdfUploadForm.js
// http://localhost:5000/api/pdfs/addpdf
import React, { useState } from 'react';
function PdfUploadForm() {
  const [nameofpdf, setNameOfPdf] = useState('');
  const [pdfowner, setPdfOwner] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleNameOfPdfChange = (event) => {
    setNameOfPdf(event.target.value);
  };

  const handlePdfOwnerChange = (event) => {
    setPdfOwner(event.target.value);
  };
  const handleUpload = async () => {
    try {
      if (!nameofpdf || !pdfowner || selectedFiles.length === 0) {
        alert('Please fill in all required fields and select one or more files');
        return;
      }
  
      const formDataArray = selectedFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onload = () => {
            const pdfcontent = reader.result;
            const formData = new FormData();
            formData.append('nameofpdf', nameofpdf);
            formData.append('pdfowner', pdfowner);
            formData.append('pdfcontent', pdfcontent);
            resolve(formData);
          };
        });
      });
  
      const responses = await Promise.all(
        formDataArray.map((formData) =>
          fetch('http://localhost:5000/api/pdfs/addpdf', {
            method: 'POST',
            body: formData,
          })
        )
      );
  
      const successResponses = responses.filter((response) => response.ok);
      if (successResponses.length === responses.length) {
        alert('All PDFs uploaded successfully');
      } else {
        alert('Some PDFs failed to upload');
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading PDFs');
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
