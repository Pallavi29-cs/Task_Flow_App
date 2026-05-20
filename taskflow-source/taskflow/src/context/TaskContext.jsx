/* context/TaskContext.jsx
   Manages task list state globally — add, edit, delete, update status */

import { createContext, useContext, useState } from 'react';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  /**
   * Replace entire task list (used after API fetch)
   * @param {Array} fetchedTasks - transformed tasks from API
   */
  const setAllTasks = (fetchedTasks) => setTasks(fetchedTasks);

  /**
   * Add a new task at the TOP of the list
   * @param {Object} newTask - { id, task, status, assignedTo }
   */
  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  /**
   * Update an existing task by id
   * @param {Object} updatedTask - must include id
   */
  const editTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  /**
   * Remove a task by id
   * @param {number} id
   */
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  /**
   * Update only the status field of a task
   * @param {number} id
   * @param {string} status - 'In Progress' | 'Completed' | 'Hold'
   */
  const updateStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, setAllTasks, addTask, editTask, deleteTask, updateStatus }}>
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook
export function useTasks() {
  return useContext(TaskContext);
}
