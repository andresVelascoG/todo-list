import React from 'react';
import './Button.css';

export default function Button({ children, onClickEvent, color = 'mainButton', selected }) {
  console.log(selected);
  const isSelected = selected ? 'selected' : '';
  return (
    <button className={`${color} ${isSelected}`} onClick={onClickEvent}>
      {children}
    </button>
  );
}
