import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import TaskCard from './components/TaskCard'

function App() {

  const apiUrl = import.meta.env.VITE_API_URL;

  const [tasks, setTasks] = useState([])
  // const [filter, setFilter] = useState()

  useEffect(()=>{
    const getTasks = async ()=>{
      const tasks = await axios.get(`${apiUrl}/tasks`)
      setTasks(tasks.data)
    }
    getTasks();
  },[])

  return (
    <div>
      <h1>Mis tareas</h1>
      {/* <input
        aria-label='Search'
        onChange={(e)=>setFilter(e.value)}
      /> */}
      <div className='taskList'>
      {tasks.map((task)=>{
        return<TaskCard task={task}/>
      })}
      </div>
    </div>
  )
}

export default App
