import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ apiURL }) {
  const navigate = useNavigate();

  function isUserLoggedIn() {
    return localStorage.getItem("user") !== null;
  }

  function handleLogout() {
    fetch(`${apiURL}/users/sign_out`, {
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
        <div>
          {window.location.pathname !== "/" ? (
            <button onClick={() => navigate("/")}>Home</button>
          ) : null}
          <button onClick={() => navigate("/user_tasks")}>Tasks</button>
          <button onClick={() => navigate("/add_task")}>Add Task</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="button-container">
          {window.location.pathname === "/signup" ||
          window.location.pathname === "/login" ? (
            <button onClick={() => navigate("/")}>Home</button>
          ) : null}
          <button onClick={() => navigate("/signup")}>Signup</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
