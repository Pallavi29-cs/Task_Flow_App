export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <span style={styles.brand}>⬡ TaskFlow</span>
        <span style={styles.copy}>
          © {year} TaskFlow. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background:   '#151821',
    borderTop:    '1px solid #2a2f45',
    marginTop:    'auto',
  },
  inner: {
    maxWidth:       '100%',
    margin:         '0 auto',
    padding:        '18px 32px',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    gap:            '12px',
    flexWrap:       'wrap',
  },
  brand: {
    fontSize:   '15px',
    fontWeight:  700,
    color:      '#6c63ff',
  },
  copy: {
    fontSize: '13px',
    color:    '#5a6280',
  },
};
