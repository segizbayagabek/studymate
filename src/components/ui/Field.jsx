import "./Field.css";

export default function Field({ label, hint, children, caret = false }) {
  return (
    <label className="sm-field">
      {label && <span className="sm-field__label">{label}</span>}
      <span className="sm-field__control">
        <span className="sm-field__value">{children}</span>
        {caret && <span className="sm-field__caret">▾</span>}
      </span>
      {hint && <span className="sm-field__hint">{hint}</span>}
    </label>
  );
}
