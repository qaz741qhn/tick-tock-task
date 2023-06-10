import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from './components/Form';
import Input from './components/Input';
import './SignupLogin.css';

function Signup({apiURL}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isInvalid = password === "" || email === "";

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  function handleEmailSignup(event) {
    event.preventDefault();

    fetch(`${apiURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('user')}`
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
          return response.json();
        } else {
          throw new Error("Registration failed");
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div className="signup-login">
      <h1>Sign Up</h1>

      <Form onSubmit={handleEmailSignup}>
        <Input
          name="email"
          value={email}
          onChange={handleChange}
          type="text"
          placeholder="Email Address"
        />

        <Input
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />

        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </Form>
    </div>
  );
}

export default Signup;
