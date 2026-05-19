import { useState } from 'react';
import { STATUS_OPTIONS } from '../utils/constants';

function getStatusStyle(status) {
  switch (status) {
    case 'Completed':   return styles.badgeCompleted;
    case 'Hold':        return styles.badgeHold;
    default:            return styles.badgeInProgress; 
  }
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [isEditing,   setIsEditing]   = useState(false);
  const [editTask,    setEditTask]    = useState(task.task);
  const [editStatus,  setEditStatus]  = useState(task.status);
  const [editAssigned,setEditAssigned]= useState(task.assignedTo);
  const [taskError,   setTaskError]   = useState('');

  
  function handleSave() {
    if (!editTask.trim()) {
      setTaskError('Task name cannot be empty.');
      return;
    }
    if (!editAssigned.trim()) {
      setTaskError('Assigned user cannot be empty.');
      return;
    }
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


  if (isEditing) {
    return (
      <div style={styles.card}>
        {}
        <span style={styles.taskId}>#{task.id}</span>

        {}
        <div style={styles.field}>
          <label style={styles.label}>TASK NAME</label>
          <input
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            style={styles.input}
            placeholder="Task name"
          />
        </div>

        {}
        <div style={styles.row}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>STATUS</label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              style={styles.input}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={styles.label}>ASSIGNED TO</label>
            <input
              value={editAssigned}
              onChange={(e) => setEditAssigned(e.target.value)}
              style={styles.input}
              placeholder="Enter username"
            />
          </div>
        </div>

        {}
        {taskError && <span style={styles.error}>{taskError}</span>}

        {}
        <div style={styles.actions}>
          <button onClick={handleSave}   style={styles.saveBtn}>✓ Save</button>
          <button onClick={handleCancel} style={styles.cancelBtn}>✕ Cancel</button>
        </div>
      </div>
    );
  }


  return (
    <div style={styles.card}>
      {}
      <span style={styles.taskId}>#{task.id}</span>

      {}
      <p style={styles.taskName}>{task.task}</p>

      {}
      <div style={styles.meta}>
        <span style={{ ...styles.badge, ...getStatusStyle(task.status) }}>
          {task.status}
        </span>

        {task.assignedTo && (
          <span style={styles.assignee}>
            👤 {task.assignedTo}
          </span>
        )}
      </div>

      {}
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value)}
        style={styles.statusSelect}
        aria-label="Change status"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {}
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
    background:   '#1c2030',
    border:       '1px solid #2a2f45',
    borderRadius: '12px',
    padding:      '20px',
    display:      'flex',
    flexDirection:'column',
    gap:          '12px',
    transition:   'border-color 0.2s',
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
  statusSelect: {
    background:   '#151821',
    border:       '1px solid #2a2f45',
    borderRadius: '8px',
    color:        '#9aa3c0',
    fontSize:     '13px',
    padding:      '6px 10px',
    cursor:       'pointer',
    width:        '100%',
    outline:      'none',
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
  
  label: {
    fontSize:      '11px',
    fontWeight:     700,
    letterSpacing: '0.08em',
    color:         '#5a6280',
    textTransform: 'uppercase',
    display:       'block',
    marginBottom:  '6px',
  },
  input: {
    background:   '#151821',
    border:       '1px solid #2a2f45',
    borderRadius: '8px',
    color:        '#e8eaf0',
    fontSize:     '14px',
    padding:      '9px 12px',
    width:        '100%',
    outline:      'none',
    fontFamily:   "'Poppins', sans-serif",
  },
  row: {
    display: 'flex',
    gap:     '12px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  error: {
    color:    '#f87171',
    fontSize: '12px',
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
    padding:      '9px 20px',
    fontSize:     '13px',
    fontWeight:    600,
    cursor:       'pointer',
    fontFamily:   "'Poppins', sans-serif",
  },
};
