import React from 'react'
import './Button.css'

export default function Button({children, onClickEvent, color='white', selected}) {

  let isSelected = selected === true ?  "selected" : "";
  
  return (
    <button
    className={`${color} ${isSelected}`}
    onClick={onClickEvent}
    >
        {children}
    </button>
  )
}
