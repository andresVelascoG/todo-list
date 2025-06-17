import React from "react";
import "./TaskModal.css";

const TaskModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default TaskModal;
