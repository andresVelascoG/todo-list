import React, { useState } from 'react';
import './TaskCard.css';
import axios from 'axios';
import { FaTrash, FaEdit, FaTasks } from 'react-icons/fa';
import ConfirmModal from './ConfirmModal';
import UpdateTaskModal from './updateTask';
import ChecklistModal from './Checklist';

export default function TaskCard({ task: initialTask, onDelete }) {
  const [task, setTask] = useState(initialTask);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showModalCheckList, setShowModalCheckList] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const statusClass =
    task.status === 'DONE'
      ? 'doneColor'
      : task.status === 'IN_PROGRESS'
        ? 'progressColor'
        : 'openColor';

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleUpdateClick = () => {
    setEditTask({ ...task });
    setShowUpdateModal(true);
  };
  const handleCheckListClick = () => setShowModalCheckList(true);
  
  const updateChecklists = (updatedChecklists) => {
    setTask((prevTask) => ({
      ...prevTask,
      checklist: updatedChecklists,
    }));
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/tasks/${task.uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (onDelete) onDelete(task.uuid);
    } catch (error) {
      console.error('Error al borrar la tarea:', error);
      if (error.response?.status === 401) window.location.href = '/';
    } finally {
      setShowDeleteModal(false);
    }
  };

  const confirmUpdate = async (updatedTask) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(
        `http://localhost:8080/tasks/${updatedTask.uuid}`,
        { status: updatedTask.status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTask((prev) => ({ ...prev, status: updatedTask.status }));
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    } finally {
      setShowUpdateModal(false);
    }
  };

  return (
    <div className={`taskCardContainer ${statusClass}`}>
      <div className="taskDetails">
        <h3 className="taskTitle">{task.title}</h3>
        <p className="taskDescription">{task.description}</p>
      </div>
      <div className="taskActions">
        <button className="iconButton delete" onClick={handleDeleteClick}>
          <FaTrash />
        </button>
        <button className="iconButton update" onClick={handleUpdateClick}>
          <FaEdit />
        </button>
        <button className="iconButton checklist" onClick={handleCheckListClick}>
          <FaTasks />
        </button>
      </div>

      {showDeleteModal && (
        <ConfirmModal
          message="¿Estás seguro de que deseas borrar esta tarea?"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showUpdateModal && editTask && (
        <UpdateTaskModal
          task={editTask}
          onConfirm={confirmUpdate}
          onCancel={() => setShowUpdateModal(false)}
        />
      )}

      {showModalCheckList && (
        <ChecklistModal
          task={task}
          onCancel={() => setShowModalCheckList(false)}
          onUpdate={updateChecklists}
        />
      )}
    </div>
  );
}
