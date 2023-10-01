import React, { Component, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from "./Alert";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
   
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(null); // State for managing alerts


  function handleSubmit(e) {
    e.preventDefault();
    const {  email, password } = formData;
    console.log(email, password);
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.status == "ok") {
         
          window.localStorage.setItem("token", data.authtoken);
          window.localStorage.setItem("loggedIn", true);

          navigate('/userDetails'); // Navigate to UserDetails route
        }else {
          // Handle errors from the server
          setAlert({ message: "Enter valid crediantials", type: "danger" });
        }
      });
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAlertClose = () => {
    setAlert(null);
  };
  
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            dismissible={true}
            onClose={handleAlertClose}
          ></Alert>
        )}
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleInputChange}

          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleInputChange}

          />
        </div>
       
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
           <a href="sign-up">create account?</a>
        </p>
      </form>
        </div>
      </div>
  );
}
