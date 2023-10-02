import logo from './logo.svg';
import './App.css';
import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PdfUploadForm from './components/PdfUploadForm';
import Signup from './components/Signup';
import Login  from './components/Login';
import UserDetails from './components/UserDetails';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn == "true" ? <UserDetails /> : <Login />}
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/pdfUpload" element={<PdfUploadForm />} />
          
        </Routes>
        {/* <ImageUpload/> */}
      </div>
    </Router>
  );
}

export default App;
