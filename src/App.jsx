import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([{
    "id": 0,
    "title": "Tittle of the task",
    "description": "task of the student",
    "Status": "OPEN"
  },
  {
    "id": 0,
    "title": "Tittle of the task",
    "description": "task of the student",
    "Status": "OPEN"
  },
  {
    "id": 0,
    "title": "Tittle of the task",
    "description": "task of the student",
    "Status": "OPEN"
  }])

  useEffect(()=>{
    const getTasks = async ()=>{
      const tasks = await axios.get(`${VITE_API_URL}/taks`)
      setTasks=(tasks.data)
    }
    getTasks();
  },[])

  return (
    <div>
      <h1>Mis tareas</h1>
      {tasks.map((task)=>{
        return<div>{task.name}</div>
      })}
    </div>
  )
}

export default App
