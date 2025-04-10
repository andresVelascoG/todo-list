import React from 'react'
import './TaskCard.css';

export default function TaskCard({task}) {
    const statusClass = task.status == "DONE"?
    "doneColor" : task.status == "IN_PROGRESS"?
    "progressColor":"openColor"
  return (
    <a className={`taskCardContainer ${statusClass}`}>
        {task.title}
    </a>
  )
}
