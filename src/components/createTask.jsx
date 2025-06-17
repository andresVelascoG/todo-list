import React, { useState } from "react";
import axios from "axios";
import "./createTask.css";

const CreateTask = ({ onFinish }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${apiUrl}/tasks`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onFinish) {
        onFinish(); // Cierra el modal si se pasa onFinish
      } else {
        window.location.href = "/tasks/getTask"; // sigue redirigiendo si no está en modal
      }
    } catch (error) {
      setMensaje("No se pudo registrar la tarea");
    }
  };

  return (
    <div className="task-reg-container">
      <h2>Create a task</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="inputs">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="registerContainer">
          <button type="submit">Create</button>
        </div>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CreateTask;
