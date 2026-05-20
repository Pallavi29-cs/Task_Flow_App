import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks }     from '../hooks/useTasks';
import { validateTask } from '../utils/validation';
import { STATUS_OPTIONS } from '../utils/constants';

export default function EditTask() {
  const { id }                  = useParams();
  const navigate                = useNavigate();
  const { tasks, editTask }     = useTasks();

  
  const existingTask = tasks.find((t) => String(t.id) === String(id));

  
  const [fields, setFields] = useState({
    task:       '',
    status:     'In Progress',
    assignedTo: '',
  });
  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    if (existingTask) {
      setFields({
        task:       existingTask.task,
        status:     existingTask.status,
        assignedTo: existingTask.assignedTo,
      });
    }
  }, [existingTask]);

  
  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  
  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateTask(fields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    editTask(Number(id), {
      task:       fields.task.trim(),
      status:     fields.status,
      assignedTo: fields.assignedTo.trim(),
    });
    navigate('/home');
  }

  
  if (!existingTask) {
    return (
      <main style={styles.page}>
        <div style={styles.notFound}>
          <p style={styles.notFoundIcon}>🔍</p>
          <h3 style={{ color: '#e8eaf0', marginBottom: '8px' }}>Task not found</h3>
          <p style={{ color: '#5a6280', fontSize: '14px', marginBottom: '20px' }}>
            The task with ID #{id} does not exist.
          </p>
          <button onClick={() => navigate('/home')} style={styles.submitBtn}>
            ← Back to Home
          </button>
        </div>
      </main>
    );
  }

  
  return (
    <main style={styles.page}>
      {}
      <div style={styles.header}>
        <h2 style={styles.title}>Edit Task</h2>
        <p style={styles.subtitle}>
          Editing task{' '}
          <span style={styles.idBadge}>#{existingTask.id}</span>
        </p>
      </div>

      {}
      <div style={styles.card}>
        <form onSubmit={handleSubmit} noValidate style={styles.form}>

          {}
          <div style={styles.fieldGroup}>
            <label htmlFor="task" style={styles.label}>TASK NAME *</label>
            <input
              id="task"
              name="task"
              type="text"
              value={fields.task}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.task ? styles.inputError : {}),
              }}
            />
            {errors.task && <span style={styles.err}>{errors.task}</span>}
          </div>

          {}
          <div style={styles.fieldGroup}>
            <label htmlFor="status" style={styles.label}>STATUS *</label>
            <select
              id="status"
              name="status"
              value={fields.status}
              onChange={handleChange}
              style={styles.input}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {}
          <div style={styles.fieldGroup}>
            <label htmlFor="assignedTo" style={styles.label}>ASSIGNED TO *</label>
            <input
              id="assignedTo"
              name="assignedTo"
              type="text"
              value={fields.assignedTo}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.assignedTo ? styles.inputError : {}),
              }}
            />
            {errors.assignedTo && (
              <span style={styles.err}>{errors.assignedTo}</span>
            )}
          </div>

          {}
          <div style={styles.actions}>
            <button type="submit" style={styles.submitBtn}>
              ✓ Save Changes
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
    </main>
  );
}


const styles = {
  page: {
    maxWidth: '980px',
    width:    '100%',
    margin:   '0 auto',
    padding:  '40px 32px',
    flex:      1,
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize:   '28px',
    fontWeight:  800,
    color:      '#e8eaf0',
    marginBottom:'8px',
  },
  subtitle: {
    fontSize: '14px',
    color:    '#5a6280',
  },
  idBadge: {
    fontFamily: "'JetBrains Mono', monospace",
    color:      '#6c63ff',
    fontWeight:  600,
  },
  card: {
    background:   '#1c2030',
    border:       '1px solid #2a2f45',
    borderRadius: '16px',
    padding:      '36px',
  },
  form: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '24px',
  },
  fieldGroup: {
    display:       'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize:      '11px',
    fontWeight:     700,
    letterSpacing: '0.08em',
    color:         '#5a6280',
    textTransform: 'uppercase',
    marginBottom:  '8px',
  },
  input: {
    background:   '#151821',
    border:       '1px solid #2a2f45',
    borderRadius: '10px',
    color:        '#e8eaf0',
    fontSize:     '14px',
    padding:      '13px 16px',
    width:        '100%',
    outline:      'none',
    fontFamily:   "'Poppins', sans-serif",
    transition:   'border-color 0.2s',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  err: {
    color:     '#f87171',
    fontSize:  '12px',
    marginTop: '5px',
  },
  actions: {
    display:   'flex',
    gap:       '12px',
    marginTop: '4px',
  },
  submitBtn: {
    background:   '#6c63ff',
    color:        '#fff',
    border:       'none',
    borderRadius: '10px',
    padding:      '13px 28px',
    fontSize:     '15px',
    fontWeight:    700,
    cursor:       'pointer',
    fontFamily:   "'Poppins', sans-serif",
  },
  cancelBtn: {
    background:   '#151821',
    color:        '#9aa3c0',
    border:       '1px solid #363c5a',
    borderRadius: '10px',
    padding:      '13px 24px',
    fontSize:     '14px',
    fontWeight:    600,
    cursor:       'pointer',
    fontFamily:   "'Poppins', sans-serif",
  },
  notFound: {
    textAlign:  'center',
    padding:    '80px 24px',
  },
  notFoundIcon: {
    fontSize:     '48px',
    marginBottom: '16px',
  },
};
