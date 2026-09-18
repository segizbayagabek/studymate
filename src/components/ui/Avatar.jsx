import "./Avatar.css";

/** tone: "navy" | "light" */
export default function Avatar({ initials, size = 34, tone = "navy", className = "" }) {
  return (
    <span
      className={`sm-avatar sm-avatar--${tone} ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.35)) }}
    >
      {initials}
    </span>
  );
}
