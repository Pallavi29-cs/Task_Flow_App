import { useState, useEffect } from 'react';
import { fetchTasks } from '../services/taskService';
import { STORAGE_KEYS } from '../utils/constants';

export function useTasks() {
  const [tasks,   setTasks]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);

      
      const cached = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (cached) {
        setTasks(JSON.parse(cached));
        setLoading(false);
        return;
      }

      
      const data = await fetchTasks();
      setTasks(data);
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(data));
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching tasks.');
    } finally {
      setLoading(false);
    }
  }

  function persist(updated) {
    setTasks(updated);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updated));
  }

  
  function addTask(taskData) {
    const newTask = {
      id:         Date.now(),          
      task:       taskData.task.trim(),
      status:     taskData.status,
      assignedTo: taskData.assignedTo.trim(),
    };
    persist([newTask, ...tasks]);
    return newTask;
  }


  function editTask(id, updates) {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    persist(updated);
  }

  
  function deleteTask(id) {
    const updated = tasks.filter((t) => t.id !== id);
    persist(updated);
  }

 
  function updateStatus(id, status) {
    editTask(id, { status });
  }

  return {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    deleteTask,
    updateStatus,
    reload: loadTasks,
  };
}
