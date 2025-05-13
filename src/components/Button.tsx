import React from 'react'
import './Button.css'

export default function Button({children, onClickEvent, color='white', selected}) {

  let classColor = color ==='red' 
  ? 'red' : color ==='green'
  ? 'greenButton' : 'mainButton';

  let isSelected = selected === true ?  "selected" : "";
  
  console.log(classColor);
  return (
    <button
    className={`${classColor} ${isSelected}`}
    onClick={onClickEvent}
    >
        {children}
    </button>
  )
}
