import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLogin } from '../utils/validation';

export default function Login() {
  const { login }  = useAuth();
  const navigate   = useNavigate();

  
  const [fields, setFields] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);

  
  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  
  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateLogin(fields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    login({ name: fields.name.trim(), email: fields.email.trim() });
    navigate('/home');
  }

  
  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {}
        <div style={styles.logoWrap}>
          <span style={styles.hexIcon}>⬡</span>
          <h1 style={styles.appName}>TaskFlow</h1>
          <p style={styles.subtitle}>Sign in to manage your tasks</p>
        </div>

        {}
        <form onSubmit={handleSubmit} style={styles.form} noValidate>

          {}
          <div style={styles.fieldGroup}>
            <label htmlFor="name" style={styles.label}>FULL NAME</label>
            <input
              id="name"
              name="name"
              type="text"
              value={fields.name}
              onChange={handleChange}
              placeholder="e.g. Pallavi"
              style={{
                ...styles.input,
                ...(errors.name ? styles.inputError : {}),
              }}
              autoComplete="name"
            />
            {errors.name && <span style={styles.err}>{errors.name}</span>}
          </div>

          {}
          <div style={styles.fieldGroup}>
            <label htmlFor="email" style={styles.label}>EMAIL ADDRESS</label>
            <input
              id="email"
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              autoComplete="email"
            />
            {errors.email && <span style={styles.err}>{errors.email}</span>}
          </div>

          {}
          <div style={styles.fieldGroup}>
            <label htmlFor="password" style={styles.label}>PASSWORD</label>
            <div style={styles.pwWrap}>
              <input
                id="password"
                name="password"
                type={showPw ? 'text' : 'password'}
                value={fields.password}
                onChange={handleChange}
                placeholder="Min 6 chars, 1 uppercase, 1 number"
                style={{
                  ...styles.input,
                  paddingRight: '44px',
                  ...(errors.password ? styles.inputError : {}),
                }}
                autoComplete="current-password"
              />
              {}
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                style={styles.eyeBtn}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && <span style={styles.err}>{errors.password}</span>}
          </div>

          {}
          <button type="submit" style={styles.submitBtn}>
            Sign In →
          </button>

          <p style={styles.hint}>
            Password must be 6+ characters with an uppercase letter and a number.
          </p>
        </form>
      </div>

      {}
      <div style={styles.blobLeft}  aria-hidden="true" />
      <div style={styles.blobRight} aria-hidden="true" />
    </div>
  );
}


const styles = {
  page: {
    minHeight:      '100vh',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    background:     '#0d0f14',
    position:       'relative',
    overflow:       'hidden',
    padding:        '24px',
  },
  blobLeft: {
    position:     'absolute',
    left:         '-200px',
    bottom:       '-100px',
    width:        '500px',
    height:       '500px',
    borderRadius: '50%',
    background:   'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)',
    pointerEvents:'none',
  },
  blobRight: {
    position:     'absolute',
    right:        '-150px',
    top:          '50px',
    width:        '450px',
    height:       '450px',
    borderRadius: '50%',
    background:   'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)',
    pointerEvents:'none',
  },
  card: {
    background:   '#151821',
    border:       '1px solid #2a2f45',
    borderRadius: '20px',
    padding:      '48px 40px',
    width:        '100%',
    maxWidth:     '440px',
    position:     'relative',
    zIndex:        1,
  },
  logoWrap: {
    textAlign:    'center',
    marginBottom: '36px',
  },
  hexIcon: {
    fontSize:   '32px',
    color:      '#6c63ff',
    display:    'block',
    marginBottom:'8px',
  },
  appName: {
    fontFamily:    "'Poppins', sans-serif",
    fontSize:      '28px',
    fontWeight:     800,
    color:         '#e8eaf0',
    letterSpacing: '-0.02em',
    marginBottom:  '6px',
  },
  subtitle: {
    fontSize: '14px',
    color:    '#5a6280',
  },
  form: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '20px',
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
    marginBottom:  '7px',
  },
  input: {
    background:   '#1c2030',
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
  pwWrap: {
    position: 'relative',
  },
  eyeBtn: {
    position:   'absolute',
    right:      '12px',
    top:        '50%',
    transform:  'translateY(-50%)',
    background: 'none',
    border:     'none',
    cursor:     'pointer',
    fontSize:   '16px',
    padding:    '4px',
    lineHeight:  1,
  },
  err: {
    color:     '#f87171',
    fontSize:  '12px',
    marginTop: '5px',
  },
  submitBtn: {
    background:   '#6c63ff',
    color:        '#fff',
    border:       'none',
    borderRadius: '10px',
    padding:      '14px',
    fontSize:     '15px',
    fontWeight:    700,
    cursor:       'pointer',
    fontFamily:   "'Poppins', sans-serif",
    letterSpacing:'0.02em',
    transition:   'all 0.2s',
    marginTop:    '4px',
  },
  hint: {
    fontSize:  '12px',
    color:     '#5a6280',
    textAlign: 'center',
    lineHeight: 1.5,
  },
};
