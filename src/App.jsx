import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TaskCard from './components/TaskCard';
import Button from './components/Button';
import ErrorCard from './components/ErrorCard';
import TaskModal from './components/TaskModal';
import CreateTask from './components/createTask';

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const token = localStorage.getItem('token');
      const searchParams = new URLSearchParams(window.location.search);
      const status = searchParams.get('status');

      let url = `${apiUrl}/tasks`;
      if (status) {
        url += `?status=${status}`;
      }

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(response.data.data);
        setFilteredTasks(response.data.data);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
        if (error.response?.status === 401) {
          window.location.href = '/';
        } else {
          setErrorMessage(
            'There are no tasks with this status.'
          );
        }
      }
    };

    getTasks();
  }, []);

  useEffect(() => {
    if (filter === '') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [filter, tasks]);

  return (
    <div>
      <h1>My tasks</h1>
      <div className="headerBar">
        <div className="searchContainer">
          <input
            placeholder="Filter your task by name"
            className="searchBar"
            type="text"
            aria-label="Search"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </div>
        <div className="headerClickeables">
          <div className="buttonsContainer">
            <Button
              onClickEvent={() => {
                window.location.href = '/tasks';
              }}
            >
              All
            </Button>

            <Button
              onClickEvent={() => {
                window.location.href = '/tasks?status=OPEN';
              }}
              selected={false}
            >
              Open
            </Button>

            <Button
              onClickEvent={() => {
                window.location.href = '/tasks?status=IN_PROGRESS';
              }}
            >
              In progress
            </Button>

            <Button
              onClickEvent={() => {
                window.location.href = '/tasks?status=DONE';
              }}
            >
              Done
            </Button>
          </div>

          <Button onClickEvent={() => setShowModal(true)} color="greenButton">
            Add
          </Button>

          {}
          <TaskModal isOpen={showModal} onClose={() => setShowModal(false)}>
            <CreateTask
              onFinish={() => {
                setShowModal(false);
                window.location.reload();
              }}
            />
          </TaskModal>
        </div>
      </div>

      <div className="taskList">
        {errorMessage ? (
          <ErrorCard message={errorMessage} />
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.uuid}
              task={task}
              onDelete={(uuid) => {
                const updatedTasks = tasks.filter((t) => t.uuid !== uuid);
                setTasks(updatedTasks);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
