/* hooks/useFetchTasks.js
   Custom hook — fetches tasks on mount and manages loading/error state */

import { useState, useEffect } from 'react';
import { fetchTasks } from '../services/taskService';
import { useTasks } from '../context/TaskContext';

export function useFetchTasks() {
  const { setAllTasks } = useTasks();
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    let cancelled = false; // prevent state update if component unmounts

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTasks();
        if (!cancelled) {
          setAllTasks(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to fetch tasks. Please try again.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => { cancelled = true; }; // cleanup
  }, []); // run only once on mount

  return { loading, error };
}
