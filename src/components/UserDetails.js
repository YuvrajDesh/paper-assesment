import React, { Component, useEffect, useState } from "react";
import AdminHome from "./AdminHome";

import UserHome from "./UserHome";

export default function UserDetails() {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    
        <div>
         <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
     
  );
}
