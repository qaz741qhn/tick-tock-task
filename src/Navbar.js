// Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function isUserLoggedIn() {
    return localStorage.getItem("user") !== null;
  }

  function handleLogout() {
    fetch("http://localhost:3000/users/sign_out", {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <nav>
      {isUserLoggedIn() ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <button onClick={() => navigate("/signup")}>Signup</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
