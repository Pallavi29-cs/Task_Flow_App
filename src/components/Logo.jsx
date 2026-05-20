/* Logo — matches the design: thin hexagon outline in purple */
export default function Logo({ size = 24, className, style }) {
  return (
    <svg
      className={className}
      style={{ display: 'block', ...style }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagon: flat-top orientation, matching the design */}
      <polygon
        points="12,2 21,7 21,17 12,22 3,17 3,7"
        fill="none"
        stroke="#7C6BFF"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
