import React, { useState ,useEffect } from "react";
import Alert from "./Alert"; // Import the Alert component

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [alert, setAlert] = useState(null); // State for managing alerts
  

  
  const handleAlertClose = () => {
    setAlert(null); // Set alert to null to close it
  };
  const handleSubmit = (e) => {
    if (userType == "Admin" && secretKey != "yuvi") {
      e.preventDefault();
      setAlert({ message: "Invalid Admin", type: "danger" }); // Show an alert
    }else{

      e.preventDefault();
      const { name, email, password } = formData;
      console.log(name, email, password);
      fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
         name, email, password, userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.errors) {
            // Handle errors from the server
            setAlert({ message: data.errors[0].msg, type: "danger" });
          }else{
            setAlert({ message: "Successfully registed", type: "success" }); // Show an alert
          }
          

        });
    }
   
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          >
            {/* Include a close button within the Alert */}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleAlertClose}
            ></button>
          </Alert>
        )}
         
        <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <div>
            Register As
            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            />
            User
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </div>
          {userType == "Admin" ? (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          ) : null}

      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="name"
          onChange={handleInputChange}
        />
      </div>

     

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Enter email"
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Enter password"
          onChange={handleInputChange}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
        </div>
    </div>
    
  );
}

export default SignUp;
