/* components/TaskCard.jsx
   Single task card — view mode and inline edit mode matching design */

import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { validateTask } from '../utils/validation';
import './TaskCard.css';

const STATUS_OPTIONS = ['In Progress', 'Completed', 'Hold'];

function statusClass(status) {
  if (status === 'Completed') return 'completed';
  if (status === 'Hold')      return 'hold';
  return 'progress';
}

export default function TaskCard({ task }) {
  const { editTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    task: task.task,
    status: task.status,
    assignedTo: task.assignedTo,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSave = () => {
    const errs = validateTask(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    editTask({ ...task, ...form });
    setIsEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    setForm({ task: task.task, status: task.status, assignedTo: task.assignedTo });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className={`task-card fade-in ${isEditing ? 'task-card--editing' : ''}`}>
      <span className="task-id">#{task.id}</span>

      {isEditing ? (
        /* ── Edit Mode — compact, matches design screenshot ── */
        <div className="task-edit-form">
          {/* Task Name */}
          <div className="edit-field">
            <label className="edit-label">TASK NAME</label>
            <input
              className={`edit-input ${errors.task ? 'input-error' : ''}`}
              name="task"
              value={form.task}
              onChange={handleChange}
            />
            {errors.task && <span className="err">{errors.task}</span>}
          </div>

          {/* Status + Assigned To side by side */}
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">STATUS</label>
              <div className="select-wrap">
                <select
                  className="edit-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </select>
                <span className="select-arrow">▼</span>
              </div>
            </div>

            <div className="edit-field">
              <label className="edit-label">ASSIGNED TO</label>
              <input
                className={`edit-input ${errors.assignedTo ? 'input-error' : ''}`}
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                placeholder="Enter username"
              />
              {errors.assignedTo && <span className="err">{errors.assignedTo}</span>}
            </div>
          </div>

          {/* Save / Cancel */}
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>✓ Save</button>
            <button className="btn-cancel-sm" onClick={handleCancel}>✕ Cancel</button>
          </div>
        </div>
      ) : (
        /* ── View Mode ── */
        <>
          <p className="task-title">{task.task}</p>

          <div className="task-meta">
            <span className={`badge badge-${statusClass(task.status)}`}>
              {task.status}
            </span>
            {task.assignedTo ? (
              <span className="assigned-to">
                <span className="assigned-icon">👤</span> {task.assignedTo}
              </span>
            ) : (
              <span className="unassigned">Unassigned</span>
            )}
          </div>

          <div className="task-actions">
            <button className="btn-edit" onClick={() => setIsEditing(true)}>✎ Edit</button>
            <button className="btn-delete" onClick={() => deleteTask(task.id)}>🗑 Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
