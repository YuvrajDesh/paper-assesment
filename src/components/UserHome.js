
import React from 'react'

export default function UserHome() {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    <div>
      <h1> This is user home</h1>
      <br />
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
    </div>
  )
}
