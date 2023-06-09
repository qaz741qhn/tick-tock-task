import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./components/Form";
import Input from "./components/Input";
import './SignupLogin.css';

function Login({apiURL}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  function handleLogin(event) {
    event.preventDefault();
  
    fetch(`${apiURL}/users/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
      credentials: "include", // add this line
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          localStorage.setItem("user", email);
          navigate("/");
        } else {
          return response.json().then((data) => {
            throw new Error(data.error);
          });
        }
      })
      .catch((error) => console.log(error.message));
  }
  

  return (
    <div className="signup-login">
      <h1>Login</h1>

      <Form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </Form>
    </div>
  );
}

export default Login;
