/* pages/AddTaskPage.jsx
   Centered card form to add a new task — validated, prepended to list */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { validateTask } from '../utils/validation';
import './AddTaskPage.css';

const STATUS_OPTIONS = ['In Progress', 'Completed', 'Hold'];

export default function AddTaskPage() {
  const { tasks, addTask } = useTasks();
  const navigate = useNavigate();

  // Auto-generate next unique ID (max existing id + 1, fallback to 1)
  const nextId = tasks.length > 0
    ? Math.max(...tasks.map((t) => t.id)) + 1
    : 1;

  const [form, setForm] = useState({
    task: '',
    status: 'In Progress',
    assignedTo: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateTask(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    addTask({
      id: nextId,
      task: form.task.trim(),
      status: form.status,
      assignedTo: form.assignedTo.trim(),
    });

    navigate('/home');
  };

  return (
    <div className="addtask-page">
      {/* Page heading — left-aligned above card */}
      <div className="addtask-header fade-in">
        <h2 className="addtask-title">Add New Task</h2>
        <p className="addtask-sub">Fill in the details to create a new task</p>
      </div>

      {/* Centered form card */}
      <div className="addtask-card fade-in">
        <form onSubmit={handleSubmit} noValidate>

          {/* Task Name */}
          <div className="field-group">
            <label className="field-label">TASK NAME *</label>
            <input
              className={`field-input ${errors.task ? 'field-error' : ''}`}
              type="text"
              name="task"
              value={form.task}
              onChange={handleChange}
              placeholder="Describe the task..."
            />
            {errors.task && <span className="err-msg">{errors.task}</span>}
          </div>

          {/* Status */}
          <div className="field-group">
            <label className="field-label">STATUS *</label>
            <select
              className="field-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Assign To */}
          <div className="field-group">
            <label className="field-label">ASSIGN TO *</label>
            <input
              className={`field-input ${errors.assignedTo ? 'field-error' : ''}`}
              type="text"
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleChange}
              placeholder="Enter team member's name"
            />
            {errors.assignedTo && <span className="err-msg">{errors.assignedTo}</span>}
          </div>

          {/* Auto ID preview */}
          <div className="task-id-preview">
            Task ID will be: <span className="id-value">#{nextId}</span>
          </div>

          {/* Submit / Cancel */}
          <div className="form-actions">
            <button type="submit" className="btn-add">+ Add Task</button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/home')}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
