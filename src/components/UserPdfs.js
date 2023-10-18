import React, { useEffect, useState } from 'react';
export default function UserPdfs({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = './sign-in';
  };

  const [pdfIds, setPdfIds] = useState([]);

  useEffect(() => {
    // Make a POST request to fetch PDF IDs
    fetch('http://localhost:5000/api/pdfs/fetchpdfs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedUserId: userData._id, // Send the user's ID to the server
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Data should contain the PDF IDs
        
        setPdfIds(data);
        console.log(pdfIds);
      })
      .catch((error) => {
        console.error('Error fetching PDF IDs:', error);
        // Handle the error as needed
      });
  }, [userData]);

  return (
    <div className="auth-wrapper">
    <div className="auth-inner">
      {/* <div>
        <h1>Name: {userData._id}</h1>
        <h1>Email: {userData.email}</h1>
        <br />
        <button onClick={logOut} className="btn btn-primary">
          Log Out
        </button>

      </div> */}
      <div>
      <h2>PDF IDs:</h2>
      <ul>
        {pdfIds.map((pdfId) => (
          <li key={pdfId._id}>{pdfId._id}</li>
        ))}
      </ul>
    </div>
    </div>
  </div>
  );
}


