import logo from './logo.svg';
import './App.css';
import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PdfUploadForm from './components/PdfUploadForm';
import Signup from './components/Signup';
import Login  from './components/Login';
import UserDetails from './components/UserDetails';
import UserHome from './components/UserHome';
import UserPdfs from './components/UserPdfs';

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
          <Route exact path="/sign-in" element={<Login />} />
          <Route exact path="/sign-up" element={<Signup />} />
          <Route exact path="/userDetails" element={<UserDetails />} />
          <Route exact path="/pdfUpload" element={<PdfUploadForm />} />
          <Route exact path="/userHome" element={<UserHome />} />
          <Route exact path="/userPdfs" element={<UserPdfs />} />

          
        </Routes>
        {/* <ImageUpload/> */}
      </div>
    </Router>
  );
}

export default App;
