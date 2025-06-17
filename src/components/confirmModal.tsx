import React from 'react';
import './confirmModal.css';
 
const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modalBackdrop">
      <div className="modalContent">
        <p>{message}</p>
        <div className="modalButtons">
          <button onClick={onConfirm}>Ok</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
