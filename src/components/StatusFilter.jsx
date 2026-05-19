import { STATUS_OPTIONS } from '../utils/constants';

const ALL_LABEL = 'All';
const FILTERS   = [ALL_LABEL, ...STATUS_OPTIONS];

export default function StatusFilter({ active, onChange }) {
  return (
    <div style={styles.wrapper} role="group" aria-label="Filter by status">
      {FILTERS.map((filter) => {
        const isActive = active === filter;
        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            style={{
              ...styles.pill,
              ...(isActive ? styles.pillActive : styles.pillInactive),
            }}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  wrapper: {
    display:     'flex',
    alignItems:  'center',
    gap:         '6px',
    flexWrap:    'wrap',
  },
  pill: {
    border:       'none',
    borderRadius: '20px',
    padding:      '8px 18px',
    fontSize:     '13px',
    fontWeight:    600,
    cursor:       'pointer',
    transition:   'all 0.15s',
    fontFamily:   "'Poppins', sans-serif",
  },
  pillActive: {
    background: '#6c63ff',
    color:      '#fff',
  },
  pillInactive: {
    background: 'transparent',
    color:      '#9aa3c0',
  },
};
