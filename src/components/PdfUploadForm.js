import React, { useState ,useEffect } from 'react';

function PdfUploadForm() {
  const [stream, setStream] = useState('');
  const [subject, setSubject] = useState('');
  const [exam, setExam] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(''); // State to capture the selected user's _id

  const [users, setUsers] = useState([]);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleStreamChange = (event) => {
    setStream(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleExamChange = (event) => {
    setExam(event.target.value);
  };
  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value); // Update the selected user's _id
  };
  const handleUpload = async () => {
    try {
      if (!stream || !subject || !exam || !selectedFile || !selectedUserId) {
        alert('Please fill in all required fields');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = async () => {
        const pdfcontent = reader.result;

        const formData = new FormData();
        formData.append('stream', stream);
        formData.append('subject', subject);
        formData.append('exam', exam);
        formData.append('pdfcontent', pdfcontent);
        formData.append('userId', selectedUserId); // Include selected user's _id

        const response = await fetch('http://localhost:5000/api/pdfs/addpdf', {
          method: 'POST',
          body: JSON.stringify({ stream, subject,exam, pdfcontent,selectedUserId }),
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
  useEffect(() => {
    // Fetch subjects from your API endpoint
    fetch('http://localhost:5000/api/auth/getusers')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data); // Set the subjects in state
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array to fetch data once when the component mounts


  return (
    <div className="container">
      <h2 className="mt-4">Upload PDF</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <select className="form-select" onChange={handleStreamChange} value={stream}>
              <option value="">Select Stream</option>
              <option value="Stream1">Stream 1</option>
              <option value="Stream2">Stream 2</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <select className="form-select" onChange={handleSubjectChange} value={subject}>
              <option value="">Select Subject</option>
              <option value="Subject1">Subject 1</option>
              <option value="Subject2">Subject 2</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <select className="form-select" onChange={handleExamChange} value={exam}>
              <option value="">Select Exam</option>
              <option value="exam 1">exam 1</option>
              <option value="exam 2">exam 2</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <select className="form-select" onChange={handleUserChange} value={selectedUserId} >
            <option value="">Select Teacher</option>

            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <input className="form-control" type="file" onChange={handleFileChange} />
      </div>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
    

  
}

export default PdfUploadForm;
