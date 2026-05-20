import { useState, useEffect } from 'react';
import { fetchTasks } from '../services/taskService';
import { STORAGE_KEYS } from '../utils/constants';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);

      const cached = localStorage.getItem(STORAGE_KEYS.TASKS);

      // LOAD FROM LOCAL STORAGE
      if (cached) {
        const parsed = JSON.parse(cached);

        // SORT TASKS BY ID ASCENDING
        const sortedParsed = parsed.sort(
          (a, b) => a.id - b.id
        );

        setTasks(sortedParsed);
        setLoading(false);
        return;
      }

      // FETCH INITIAL TASKS
      const data = await fetchTasks();

      // SORT TASKS BY ID ASCENDING
      const sortedData = data.sort(
        (a, b) => a.id - b.id
      );

      setTasks(sortedData);

      localStorage.setItem(
        STORAGE_KEYS.TASKS,
        JSON.stringify(sortedData)
      );

    } catch (err) {
      setError(
        err.message ||
        'Something went wrong while fetching tasks.'
      );
    } finally {
      setLoading(false);
    }
  }

  function persist(updated) {
    // KEEP TASKS SORTED
    const sortedUpdated = updated.sort(
      (a, b) => a.id - b.id
    );

    setTasks(sortedUpdated);

    localStorage.setItem(
      STORAGE_KEYS.TASKS,
      JSON.stringify(sortedUpdated)
    );
  }

  function getNextId() {
    if (tasks.length === 0) return 1;

    return Math.max(
      ...tasks.map((t) => Number(t.id))
    ) + 1;
  }

  function addTask(taskData) {
    const newTask = {
      id: getNextId(),
      task: taskData.task.trim(),
      status: taskData.status,
      assignedTo: taskData.assignedTo.trim(),
    };

    // ADD NEW TASK AT END
    persist([...tasks, newTask]);

    return newTask;
  }

  function editTask(id, updates) {
    const updated = tasks.map((t) =>
      t.id === id
        ? { ...t, ...updates }
        : t
    );

    persist(updated);
  }

  function deleteTask(id) {
    const updated = tasks.filter(
      (t) => t.id !== id
    );

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