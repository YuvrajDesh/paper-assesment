import React, { Component, useEffect, useState } from "react";
import AdminHome from "./AdminHome";

import UserHome from "./UserHome";
import PdfUploadForm from "./PdfUploadForm";

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);

      });
  }, []);
  return (
    
    admin ? <AdminHome /> : <PdfUploadForm userData={userData} />
     
  );
}
