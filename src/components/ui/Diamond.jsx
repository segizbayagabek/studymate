import "./Diamond.css";

/** The peach rotated-square bullet used across every screen. */
export default function Diamond({ size = 7, tone = "peach", className = "", style }) {
  return (
    <span
      aria-hidden="true"
      className={`sm-diamond sm-diamond--${tone} ${className}`}
      style={{ width: size, height: size, ...style }}
    />
  );
}
