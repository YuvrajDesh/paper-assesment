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
  return (
    <Router>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/userDetails" component={UserDetails} /> {/* Define the UserDetails route */}

            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App;
