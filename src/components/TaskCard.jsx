import { useState } from 'react';
import { STATUS_OPTIONS } from '../utils/constants';

function getStatusStyle(status) {
  switch (status) {
    case 'Completed': return styles.badgeCompleted;
    case 'Hold':      return styles.badgeHold;
    default:          return styles.badgeInProgress;
  }
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [isEditing,    setIsEditing]    = useState(false);
  const [editTask,     setEditTask]     = useState(task.task);
  const [editStatus,   setEditStatus]   = useState(task.status);
  const [editAssigned, setEditAssigned] = useState(task.assignedTo);
  const [taskError,    setTaskError]    = useState('');

  function handleSave() {
    if (!editTask.trim()) { setTaskError('Task name cannot be empty.'); return; }
    setTaskError('');
    onEdit(task.id, {
      task:       editTask.trim(),
      status:     editStatus,
      assignedTo: editAssigned.trim(),
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditTask(task.task);
    setEditStatus(task.status);
    setEditAssigned(task.assignedTo);
    setTaskError('');
    setIsEditing(false);
  }

  /* ── EDIT MODE — matches design image exactly ── */
  if (isEditing) {
    return (
      <div style={styles.card}>
        <span style={styles.taskId}>#{task.id}</span>

        {/* Task Name */}
        <div style={styles.editFieldGroup}>
          <label style={styles.editLabel}>TASK NAME</label>
          <input
            value={editTask}
            onChange={(e) => { setEditTask(e.target.value); setTaskError(''); }}
            style={styles.editInput}
            placeholder="Task name"
          />
          {taskError && <span style={styles.editError}>{taskError}</span>}
        </div>

        {/* Status + Assigned side by side */}
        <div style={styles.editRow}>
          <div style={{ flex: 1 }}>
            <label style={styles.editLabel}>STATUS</label>
            <div style={styles.selectWrap}>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                style={styles.editSelect}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.editLabel}>ASSIGNED TO</label>
            <input
              value={editAssigned}
              onChange={(e) => setEditAssigned(e.target.value)}
              style={styles.editInput}
              placeholder="Enter username"
            />
          </div>
        </div>

        {/* Actions */}
        <div style={styles.editActions}>
          <button onClick={handleSave}   style={styles.saveBtn}>✓ Save</button>
          <button onClick={handleCancel} style={styles.cancelBtn}>✕ Cancel</button>
        </div>
      </div>
    );
  }

  /* ── VIEW MODE ── */
  return (
    <div style={styles.card}>
      <span style={styles.taskId}>#{task.id}</span>

      <p style={styles.taskName}>{task.task}</p>

      <div style={styles.meta}>
        <span style={{ ...styles.badge, ...getStatusStyle(task.status) }}>
          {task.status}
        </span>
        {task.assignedTo && (
          <span style={styles.assignee}>👤 {task.assignedTo}</span>
        )}
      </div>

      <div style={styles.actions}>
        <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
          ✎ Edit
        </button>
        <button onClick={() => onDelete(task.id)} style={styles.deleteBtn}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background:    '#1c2030',
    border:        '1px solid #2a2f45',
    borderRadius:  '12px',
    padding:       '20px',
    display:       'flex',
    flexDirection: 'column',
    gap:           '14px',
    transition:    'border-color 0.2s',
  },
  taskId: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize:   '12px',
    color:      '#6c63ff',
    fontWeight:  600,
  },
  taskName: {
    fontSize:   '15px',
    fontWeight:  600,
    color:      '#e8eaf0',
    lineHeight:  1.4,
    margin:      0,
  },
  meta: {
    display:    'flex',
    alignItems: 'center',
    gap:        '10px',
    flexWrap:   'wrap',
  },
  badge: {
    display:      'inline-flex',
    alignItems:   'center',
    padding:      '4px 10px',
    borderRadius: '20px',
    fontSize:     '12px',
    fontWeight:    600,
  },
  badgeInProgress: {
    background: 'rgba(245,197,24,0.15)',
    color:      '#f5c518',
    border:     '1px solid rgba(245,197,24,0.3)',
  },
  badgeCompleted: {
    background: 'rgba(34,197,94,0.15)',
    color:      '#22c55e',
    border:     '1px solid rgba(34,197,94,0.3)',
  },
  badgeHold: {
    background: 'rgba(59,130,246,0.15)',
    color:      '#3b82f6',
    border:     '1px solid rgba(59,130,246,0.3)',
  },
  assignee: {
    fontSize: '13px',
    color:    '#9aa3c0',
  },
  actions: {
    display: 'flex',
    gap:     '8px',
  },
  editBtn: {
    background:   '#1c2030',
    border:       '1px solid #363c5a',
    color:        '#9aa3c0',
    padding:      '8px 16px',
    borderRadius: '8px',
    fontSize:     '13px',
    fontWeight:    600,
    cursor:       'pointer',
    fontFamily:   "'Poppins', sans-serif",
    transition:   'all 0.15s',
  },
  deleteBtn: {
    background:   'rgba(239,68,68,0.1)',
    border:       '1px solid rgba(239,68,68,0.3)',
    color:        '#ef4444',
    padding:      '8px 16px',
    borderRadius: '8px',
    fontSize:     '13px',
    fontWeight:    600,
    cursor:       'pointer',
    fontFamily:   "'Poppins', sans-serif",
    transition:   'all 0.15s',
  },

  /* ── Edit mode styles ── */
  editFieldGroup: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '6px',
  },
  editLabel: {
    fontSize:      '10px',
    fontWeight:     700,
    letterSpacing: '0.09em',
    color:         '#5a6280',
    textTransform: 'uppercase',
    display:       'block',
    marginBottom:  '5px',
  },
  editInput: {
    background:   '#151821',
    border:       '1px solid #2a2f45',
    borderRadius: '8px',
    color:        '#e8eaf0',
    fontSize:     '13px',
    padding:      '9px 12px',
    width:        '100%',
    outline:      'none',
    fontFamily:   "'Poppins', sans-serif",
    boxSizing:    'border-box',
  },
  editRow: {
    display: 'flex',
    gap:     '10px',
  },
  selectWrap: {
    position: 'relative',
  },
  editSelect: {
    background:   '#151821',
    border:       '1px solid #2a2f45',
    borderRadius: '8px',
    color:        '#e8eaf0',
    fontSize:     '13px',
    padding:      '9px 28px 9px 12px',
    width:        '100%',
    outline:      'none',
    fontFamily:   "'Poppins', sans-serif",
    cursor:       'pointer',
    appearance:   'none',
    boxSizing:    'border-box',
  },
  editError: {
    color:    '#f87171',
    fontSize: '11px',
  },
  editActions: {
    display: 'flex',
    gap:     '8px',
  },
  saveBtn: {
    background:   '#6c63ff',
    color:        '#fff',
    border:       'none',
    borderRadius: '8px',
    padding:      '9px 20px',
    fontSize:     '13px',
    fontWeight:    600,
    cursor:       'pointer',
    fontFamily:   "'Poppins', sans-serif",
  },
  cancelBtn: {
    background:   '#1c2030',
    color:        '#9aa3c0',
    border:       '1px solid #363c5a',
    borderRadius: '8px',
    padding:      '9px 16px',
    fontSize:     '13px',
    fontWeight:    600,
    cursor:       'pointer',
    fontFamily:   "'Poppins', sans-serif",
  },
};
