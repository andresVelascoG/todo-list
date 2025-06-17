import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

const SignUp = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/signin`, {
        username,
        password,
      });

    const token = response.data.accessToken;
    localStorage.setItem("token", token);
      window.location.href = "/tasks";
    } catch (error) {
      setMensaje("Credenciales incorrectas");
    }
  };

  return (
    <div className="signin-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="inputs">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="registerContainer">
          <button type="submit">Signin</button>
          <Link to="auth/signup">Register</Link>
        </div> 
      </form> 
      {mensaje && <p>{mensaje}</p>}
        
    </div>
  );
};

export default SignUp;
