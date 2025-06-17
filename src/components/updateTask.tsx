import React, { useState, useEffect } from 'react';
import './updateTask.css';

const UpdateTaskModal = ({ task, onCancel, onConfirm }) => {
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ uuid: task.uuid, status });
  };

  return (
    <div className="modalBackdrop">
      <div className="modalContent">
        <form onSubmit={handleSubmit}>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="DONE">Done</option>
          </select>
          <div className="registerContainer">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default UpdateTaskModal;
