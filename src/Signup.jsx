import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const SignUp = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        username,
        password,
      });

      setMensaje(response.data);
    } catch (error) {
      setMensaje("Error al registrar usuario");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
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
          <button type="submit">Register</button>
        </div> 
      </form> 
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default SignUp;
