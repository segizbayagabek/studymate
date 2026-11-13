
export default function Label({ children, onDark, className = "" }) {
  return (
    <div
      className={
        "text-[10px] font-bold uppercase tracking-[0.18em] " +
        (onDark ? "text-peach " : "text-peach-dark ") +
        className
      }
    >
      {children}
    </div>
  );
}
