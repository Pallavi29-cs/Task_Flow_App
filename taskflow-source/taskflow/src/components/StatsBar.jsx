/* components/StatsBar.jsx
   Displays stat cards: Total, In Progress, Completed, On Hold */

import './StatsBar.css';

export default function StatsBar({ tasks }) {
  // Derive counts
  const total      = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const completed  = tasks.filter((t) => t.status === 'Completed').length;
  const onHold     = tasks.filter((t) => t.status === 'Hold').length;

  const stats = [
    { label: 'TOTAL TASKS',  value: total,      accent: '#f1f5f9' },
    { label: 'IN PROGRESS',  value: inProgress, accent: '#f59e0b' },
    { label: 'COMPLETED',    value: completed,  accent: '#10b981' },
    { label: 'ON HOLD',      value: onHold,     accent: '#3b82f6' },
  ];

  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div className="stat-card" key={s.label} style={{ '--accent': s.accent }}>
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
