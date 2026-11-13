// One autumn leaf drawn as a small picture (SVG)
export default function Leaf({ size, color }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path d="M5 19C5 10 10 4 20 4c0 10-6 15-15 15z" fill={color} />
      <path d="M3 21L16 8" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
