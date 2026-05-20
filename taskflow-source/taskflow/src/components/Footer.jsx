/* components/Footer.jsx
   Persistent footer showing app name and current year */

import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <span className="footer-brand">⬡ TaskFlow</span>
      <span className="footer-sep">·</span>
      <span className="footer-year">© {year}</span>
    </footer>
  );
}
