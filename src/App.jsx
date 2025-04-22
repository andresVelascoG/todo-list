import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import TaskCard from './components/TaskCard'

function App() {
  const [tasks, setTasks] = useState([{
    "id": "utre094",
    "title": "Tittle of the task",
    "description": "task of the student",
    "status": "OPEN"
  },
  {
    "id": "utre094",
    "title": "Tittle of the ",
    "description": "task of the student",
    "status": "IN_PROGRESS"
  },
  {
    "id": "utre094",
    "title": "Tittle of the ahhhhh",
    "description": "task of the student",
    "status": "DONE"
  }])

  useEffect(()=>{
    const getTasks = async ()=>{
      const tasks = await axios.get(`${VITE_API_URL}/tasks`)
      setTasks(tasks.data)
    }
    //getTasks();
  },[])

  return (
    <div>
      <h1>Mis tareas</h1>
      <div className='taskList'>
      {tasks.map((task)=>{
        return<TaskCard task={task}/>
      })}
      </div>
    </div>
  )
}

export default App
