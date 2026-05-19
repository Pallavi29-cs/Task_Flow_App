export default function Loader({ message = 'Loading tasks...' }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner} />
      <p style={styles.text}>{message}</p>

      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            '16px',
    padding:        '80px 24px',
  },
  spinner: {
    width:        '44px',
    height:       '44px',
    border:       '3px solid #2a2f45',
    borderTop:    '3px solid #6c63ff',
    borderRadius: '50%',
    animation:    'spin 0.8s linear infinite',
  },
  text: {
    color:    '#9aa3c0',
    fontSize: '14px',
  },
};
