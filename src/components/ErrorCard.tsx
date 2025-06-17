import React from 'react';
import './ErrorCard.css';

function ErrorCard({ message }) {
  return (
    <div className="errorCard">
      <h2>An error has ocurred</h2>
      <p>{message}</p>
    </div>
  );
}

export default ErrorCard;
