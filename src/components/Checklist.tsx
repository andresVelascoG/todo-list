import React, { useState, useEffect } from 'react';
import './Checklist.css';
import axios from 'axios';

const ChecklistModal = ({ task, onCancel, onUpdate }) => {
  const [checklist, setChecklists] = useState(task.checklist || []);
  const [newDescription, setNewDescription] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    setChecklists(task.checklist || []);
  }, [task]);

  const handleAddChecklist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/checkLists/${task.uuid}`,
        {
          description: newDescription,
          status: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedList = [...checklist, response.data];
      setChecklists(updatedList);
      onUpdate(updatedList);
      setNewDescription('');
    } catch (error) {
      console.error('Error al agregar subtarea:', error);
    }
  };
  const toggleChecklist = async (id, currentStatus) => {
    try {
      await axios.patch(
        `http://localhost:8080/checkLists/${id}`,
        { status: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const updatedList = checklist.map((item) =>
        item.id === id ? { ...item, status: !currentStatus } : item
      );
      setChecklists(updatedList);
      onUpdate(updatedList);
    } catch (error) {
      console.error('Error al actualizar subtarea:', error);
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalContent wide">
        <div className="header">
          <h2>{task.title}</h2>
          <p className="description">{task.description}</p>
        </div>

        <form onSubmit={handleAddChecklist} className="form">
          <input
            type="text"
            placeholder="Add subtask"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>

        <ul className="checklistItems">
          {checklist.map((item) => (
            <li key={item.id} className={item.status ? 'completed' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={item.status}
                  onChange={() => toggleChecklist(item.id, item.status)}
                />
                <span>{item.description}</span>
              </label>
            </li>
          ))}
        </ul>

        <button onClick={onCancel} className="closeButton">
          Close
        </button>
      </div>
    </div>
  );
};

export default ChecklistModal;
