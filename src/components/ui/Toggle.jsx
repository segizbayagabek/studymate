import "./Toggle.css";

export default function Toggle({ checked = true, onChange, label, aside }) {
  return (
    <div className="sm-toggle">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`sm-toggle__switch ${checked ? "is-on" : ""}`}
        onClick={() => onChange?.(!checked)}
      >
        <span className="sm-toggle__knob" />
      </button>
      <span className="sm-toggle__label">{label}</span>
      {aside && <span className="sm-toggle__aside">{aside}</span>}
    </div>
  );
}
