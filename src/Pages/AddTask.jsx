import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { validateTask } from '../utils/validation';
import { STATUS_OPTIONS, STATUS } from '../utils/constants';

export default function AddTask() {
  const navigate = useNavigate();
  const { tasks, addTask } = useTasks();

  const [fields, setFields] = useState({
    task: '',
    status: STATUS.IN_PROGRESS,
    assignedTo: '',
  });

  const [errors, setErrors] = useState({});

  const nextId =
    tasks.length > 0
      ? Math.max(...tasks.map((t) => t.id)) + 1
      : 1;

  function handleChange(e) {
    const { name, value } = e.target;

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateTask(fields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addTask(fields);

    navigate('/home');
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>

        <div style={styles.header}>
          <h2 style={styles.title}>Add New Task</h2>
          <p style={styles.subtitle}>
            Fill in the details to create a new task
          </p>
        </div>

        <div style={styles.card}>
          <form onSubmit={handleSubmit} noValidate style={styles.form}>

            <div style={styles.fieldGroup}>
              <label htmlFor="task" style={styles.label}>
                TASK NAME *
              </label>

              <input
                id="task"
                name="task"
                type="text"
                value={fields.task}
                onChange={handleChange}
                placeholder="Describe the task..."
                style={{
                  ...styles.input,
                  ...(errors.task ? styles.inputError : {}),
                }}
              />

              {errors.task && (
                <span style={styles.err}>{errors.task}</span>
              )}
            </div>

            <div style={styles.fieldGroup}>
              <label htmlFor="status" style={styles.label}>
                STATUS *
              </label>

              <select
                id="status"
                name="status"
                value={fields.status}
                onChange={handleChange}
                style={styles.input}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.fieldGroup}>
              <label htmlFor="assignedTo" style={styles.label}>
                ASSIGN TO *
              </label>

              <input
                id="assignedTo"
                name="assignedTo"
                type="text"
                value={fields.assignedTo}
                onChange={handleChange}
                placeholder="Enter team member's name"
                style={{
                  ...styles.input,
                  ...(errors.assignedTo ? styles.inputError : {}),
                }}
              />

              {errors.assignedTo && (
                <span style={styles.err}>
                  {errors.assignedTo}
                </span>
              )}
            </div>

            <div style={styles.idPreview}>
              Task ID will be:
              <span style={styles.idValue}> #{nextId}</span>
            </div>

            <div style={styles.actions}>
              <button type="submit" style={styles.submitBtn}>
                + Add Task
              </button>

              <button
                type="button"
                onClick={() => navigate('/home')}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0d0f14',
    overflowY: 'auto',
    paddingTop: '64px',
  },

  container: {
    width: '600px',
    flexShrink: 0,
    padding: '0 0 40px',
  },

  header: {
    marginBottom: '28px',
    textAlign: 'left',
  },

  title: {
    fontSize: '28px',
    fontWeight: 800,
    color: '#e8eaf0',
    marginBottom: '6px',
    fontFamily: "'Poppins', sans-serif",
  },

  subtitle: {
    fontSize: '14px',
    color: '#5a6280',
  },

  card: {
    width: '100%',
    background: '#1c2030',
    border: '1px solid #2a2f45',
    borderRadius: '16px',
    padding: '36px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },

  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: '#5a6280',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },

  input: {
    background: '#151821',
    border: '1px solid #2a2f45',
    borderRadius: '10px',
    color: '#e8eaf0',
    fontSize: '14px',
    padding: '13px 16px',
    width: '100%',
    outline: 'none',
    fontFamily: "'Poppins', sans-serif",
    boxSizing: 'border-box',
  },

  inputError: {
    borderColor: '#ef4444',
  },

  err: {
    color: '#f87171',
    fontSize: '12px',
    marginTop: '5px',
  },

  idPreview: {
    background: '#151821',
    border: '1px solid #2a2f45',
    borderRadius: '10px',
    padding: '13px 16px',
    fontSize: '14px',
    color: '#5a6280',
  },

  idValue: {
    color: '#6c63ff',
    fontWeight: 700,
  },

  actions: {
    display: 'flex',
    gap: '12px',
  },

  submitBtn: {
    background: '#6c63ff',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '13px 28px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
  },

  cancelBtn: {
    background: '#151821',
    color: '#9aa3c0',
    border: '1px solid #363c5a',
    borderRadius: '10px',
    padding: '13px 24px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};