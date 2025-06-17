import React, { use, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TaskCard from "./components/TaskCard";
import Button from "./components/Button";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [tasks, setTasks] = useState([
    {
      id: "utre094",
      title: "Tittle of the task",
      description: "task of the student",
      status: "OPEN",
    },
    {
      id: "utre094",
      title: "Tittle of the ",
      description: "task of the student",
      status: "IN_PROGRESS",
    },
    {
      id: "utre094",
      title: "Tittle of the ahhhhh",
      description: "task of the student",
      status: "DONE",
    },
  ]);
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
    if (filter == "") {
      setFilteredTasks(tasks);
    } else {
      let filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [filter, tasks]);

  return (
    <div>
      <h1>Mis tareas</h1>
      <div className="headerBar">
        <div className="searchContainer">
          <input
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
                console.log("Fui clickeadoooooo");
              }}
              
            >
              {" "}
              All{" "}
            </Button>
            <Button
              onClickEvent={() => {
                console.log("Fui clickeadoooooo");
              }}
              selected={false}
            >
              {" "}
              To Do{" "}
            </Button>
            <Button
              onClickEvent={() => {
                console.log("Fui clickeadoooooo");
              }}
            >
              {" "}
              Dogin{" "}
            </Button>
            <Button
              onClickEvent={() => {
                console.log("Fui clickeadoooooo");
              }}
            >
              {" "}
              Done{" "}
            </Button>
          </div>

          <Button
            onClickEvent={() => {
              console.log("Fui clickeadoooooo");
            }}
            color="greenButton"
          >
            Add
          </Button>
        </div>
      </div>
      <div className="taskList">
        {filteredTasks.map((task) => {
          return <TaskCard task={task} />;
        })}
      </div>
    </div>
  );
}

export default App;
