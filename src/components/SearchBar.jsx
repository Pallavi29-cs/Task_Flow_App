export default function SearchBar({ value, onChange }) {
  return (
    <div style={styles.wrapper}>
      {}
      <span style={styles.icon}>🔍</span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks or users..."
        style={styles.input}
        aria-label="Search tasks"
      />

    
      {value && (
        <button
          onClick={() => onChange('')}
          style={styles.clearBtn}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}


const styles = {
  wrapper: {
    position:   'relative',
    display:    'flex',
    alignItems: 'center',
    flex:        1,
    minWidth:   '200px',
  },
  icon: {
    position:  'absolute',
    left:      '14px',
    fontSize:  '14px',
    pointerEvents: 'none',
  },
  input: {
    paddingLeft:  '40px',
    paddingRight: '36px',
    background:   '#1c2030',
    border:       '1px solid #2a2f45',
    borderRadius: '10px',
    color:        '#e8eaf0',
    fontSize:     '14px',
    height:       '44px',
    width:        '100%',
    outline:      'none',
    transition:   'border-color 0.2s',
  },
  clearBtn: {
    position:   'absolute',
    right:      '12px',
    background: 'none',
    border:     'none',
    color:      '#5a6280',
    cursor:     'pointer',
    fontSize:   '12px',
    padding:    '2px 4px',
    lineHeight:  1,
  },
};
