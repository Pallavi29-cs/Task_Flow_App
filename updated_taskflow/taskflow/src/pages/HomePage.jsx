/* pages/HomePage.jsx
   Main dashboard — welcome banner, stats, search/filter, task grid */

import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { useFetchTasks } from '../hooks/useFetchTasks';
import StatsBar from '../components/StatsBar';
import TaskCard from '../components/TaskCard';
import './HomePage.css';

const STATUSES = ['All', 'In Progress', 'Completed', 'Hold'];
const PAGE_SIZE = 9; // pagination: 9 tasks per page

export default function HomePage() {
  const { user }  = useAuth();
  const { tasks } = useTasks();

  // Fetch tasks on mount via custom hook
  const { loading, error } = useFetchTasks();

  // Search + filter state
  const [search, setSearch]     = useState('');
  const [activeFilter, setFilter] = useState('All');
  const [page, setPage]         = useState(1);

  /* ---- Derived filtered + paginated list ---- */
  const filtered = useMemo(() => {
    let list = tasks;

    // Status filter
    if (activeFilter !== 'All') {
      list = list.filter((t) => t.status === activeFilter);
    }

    // Search filter — matches task name or assignedTo
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.task.toLowerCase().includes(q) ||
          t.assignedTo.toLowerCase().includes(q)
      );
    }

    return list;
  }, [tasks, activeFilter, search]);

  // Reset page when filter/search changes
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = Math.min(page, totalPages || 1);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilterChange = (status) => {
    setFilter(status);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  /* ---- Render ---- */

  return (
    <div className="home-page">
      <div className="container">

        {/* Welcome Banner */}
        <div className="welcome-banner fade-in">
          <h2 className="welcome-text">
            Welcome, <span className="welcome-name">{user?.name}</span> 👋
          </h2>
          <p className="welcome-sub">to Task Manager</p>
        </div>

        {/* Stats */}
        <StatsBar tasks={tasks} />

        {/* Search + Filter Bar */}
        <div className="toolbar">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search tasks or users..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="filter-pills">
            {STATUSES.map((s) => (
              <button
                key={s}
                className={`pill ${activeFilter === s ? 'pill-active' : ''}`}
                onClick={() => handleFilterChange(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <p className="showing-count">
          Showing {paginated.length} of {filtered.length} tasks
        </p>

        {/* Loading State */}
        {loading && (
          <div className="center-block">
            <div className="spinner" />
            <p className="loading-text">Loading tasks...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="error-block">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && paginated.length === 0 && (
          <div className="empty-block">
            <span className="empty-icon">📋</span>
            <p>No tasks found. Try adjusting the filter or search.</p>
          </div>
        )}

        {/* Task Grid */}
        {!loading && !error && paginated.length > 0 && (
          <div className="task-grid">
            {paginated.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`page-btn ${p === currentPage ? 'page-active' : ''}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
