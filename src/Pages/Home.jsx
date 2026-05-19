import { useState, useMemo } from 'react';
import { useAuth }        from '../context/AuthContext';
import { useTasks }       from '../hooks/useTasks';
import Loader             from '../components/Loader';
import TaskCard           from '../components/TaskCard';
import SearchBar          from '../components/SearchBar';
import StatusFilter       from '../components/StatusFilter';
import { STATUS }         from '../utils/constants';

const ITEMS_PER_PAGE = 9; 

export default function Home() {
  const { user }                        = useAuth();
  const { tasks, loading, error,
          editTask, deleteTask,
          updateStatus }                = useTasks();

  const [search,      setSearch]      = useState('');
  const [activeFilter,setActiveFilter]= useState('All');
  const [page,        setPage]        = useState(1);

  
  const stats = useMemo(() => ({
    total:      tasks.length,
    inProgress: tasks.filter((t) => t.status === STATUS.IN_PROGRESS).length,
    completed:  tasks.filter((t) => t.status === STATUS.COMPLETED).length,
    hold:       tasks.filter((t) => t.status === STATUS.HOLD).length,
  }), [tasks]);

  
  const filtered = useMemo(() => {
    let list = tasks;

    
    if (activeFilter !== 'All') {
      list = list.filter((t) => t.status === activeFilter);
    }

    
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.task.toLowerCase().includes(q) ||
          t.assignedTo.toLowerCase().includes(q)
      );
    }

    return list;
  }, [tasks, activeFilter, search]);

  
  const totalPages   = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated    = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  
  function handleFilter(f) { setActiveFilter(f); setPage(1); }
  function handleSearch(q) { setSearch(q);        setPage(1); }

  
  return (
    <main style={styles.page}>

      {}
      <div style={styles.banner}>
        <h2 style={styles.welcome}>
          Welcome{' '}
          <span style={styles.username}>{user?.name}</span>
          {' '}to Task Manager
        </h2>
        <p style={styles.subtitle}>Here's what's on your plate today.</p>
      </div>

      {}
      <div style={styles.statsGrid}>
        <StatCard label="TOTAL TASKS"  value={stats.total}      accent="#e8eaf0" />
        <StatCard label="IN PROGRESS"  value={stats.inProgress}  accent="#f5c518" />
        <StatCard label="COMPLETED"    value={stats.completed}   accent="#22c55e" />
        <StatCard label="ON HOLD"      value={stats.hold}        accent="#3b82f6" />
      </div>

      {}
      <div style={styles.controls}>
        <SearchBar value={search} onChange={handleSearch} />
        <StatusFilter active={activeFilter} onChange={handleFilter} />
      </div>

      {}
      <p style={styles.countLabel}>
        Showing {paginated.length} of {filtered.length} tasks
      </p>

      {}
      {loading && <Loader />}

      {}
      {error && (
        <div style={styles.errorBox}>
          ⚠️ {error}
        </div>
      )}

      {}
      {!loading && !error && filtered.length === 0 && (
        <div style={styles.empty}>
          <p style={styles.emptyIcon}>📭</p>
          <p>No tasks match your search or filter.</p>
        </div>
      )}

      {}
      {!loading && !error && paginated.length > 0 && (
        <div style={styles.grid}>
          {paginated.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={editTask}
              onDelete={deleteTask}
              onStatusChange={updateStatus}
            />
          ))}
        </div>
      )}

      {}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            style={{ ...styles.pageBtn, ...(page === 1 ? styles.pageBtnDisabled : {}) }}
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                ...styles.pageBtn,
                ...(p === page ? styles.pageBtnActive : {}),
              }}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            style={{ ...styles.pageBtn, ...(page === totalPages ? styles.pageBtnDisabled : {}) }}
          >
            Next →
          </button>
        </div>
      )}
    </main>
  );
}


function StatCard({ label, value, accent }) {
  return (
    <div style={{ ...styles.statCard, borderLeftColor: accent }}>
      <span style={styles.statValue}>{value}</span>
      <span style={styles.statLabel}>{label}</span>
    </div>
  );
}


const styles = {
  page: {
    maxWidth: '100%',
    width:    '100%',
    margin:   '0',
    padding:  '40px 32px',
    flex:      1,
  },
  banner: {
    marginBottom: '32px',
  },
  welcome: {
    fontSize:   '24px',
    fontWeight:  700,
    color:      '#e8eaf0',
    marginBottom:'6px',
  },
  username: {
    color: '#6c63ff',
  },
  subtitle: {
    fontSize: '14px',
    color:    '#5a6280',
  },

  
  statsGrid: {
    display:             'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap:                 '16px',
    marginBottom:        '32px',
  },
  statCard: {
    background:  '#1c2030',
    border:      '1px solid #2a2f45',
    borderLeft:  '3px solid',
    borderRadius:'12px',
    padding:     '20px 24px',
    display:     'flex',
    flexDirection:'column',
    gap:         '6px',
  },
  statValue: {
    fontSize:   '32px',
    fontWeight:  800,
    color:      '#e8eaf0',
    lineHeight:  1,
    fontFamily: "'Poppins', sans-serif",
  },
  statLabel: {
    fontSize:      '11px',
    fontWeight:     700,
    letterSpacing: '0.08em',
    color:         '#5a6280',
    textTransform: 'uppercase',
  },

  
  controls: {
    display:     'flex',
    gap:         '12px',
    marginBottom:'16px',
    flexWrap:    'wrap',
    alignItems:  'center',
  },
  countLabel: {
    fontSize:     '13px',
    color:        '#5a6280',
    marginBottom: '20px',
  },

  
  grid: {
    display:             'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap:                 '16px',
  },

  
  pagination: {
    display:        'flex',
    justifyContent: 'center',
    gap:            '8px',
    marginTop:      '32px',
    flexWrap:       'wrap',
  },
  pageBtn: {
    background:   '#1c2030',
    border:       '1px solid #2a2f45',
    color:        '#9aa3c0',
    borderRadius: '8px',
    padding:      '8px 16px',
    fontSize:     '13px',
    fontWeight:    600,
    cursor:       'pointer',
    fontFamily:   "'Poppins', sans-serif",
    transition:   'all 0.15s',
  },
  pageBtnActive: {
    background:  '#6c63ff',
    borderColor: '#6c63ff',
    color:       '#fff',
  },
  pageBtnDisabled: {
    opacity: 0.35,
    cursor:  'not-allowed',
  },

  
  errorBox: {
    background:   'rgba(239,68,68,0.1)',
    border:       '1px solid rgba(239,68,68,0.3)',
    borderRadius: '10px',
    padding:      '16px 20px',
    color:        '#f87171',
    fontSize:     '14px',
  },
  empty: {
    textAlign: 'center',
    padding:   '60px 24px',
    color:     '#5a6280',
    fontSize:  '14px',
  },
  emptyIcon: {
    fontSize:     '40px',
    marginBottom: '12px',
  },
};
