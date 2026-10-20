import "./Stepper.css";

export default function Stepper({ value, onChange, min = 2, max = 8, unit = "people" }) {
  return (
    <div className="sm-stepper">
      <button
        type="button"
        className="sm-stepper__btn"
        aria-label="Decrease group size"
        onClick={() => onChange?.(Math.max(min, value - 1))}
      >
        –
      </button>
      <span className="sm-stepper__value">
        {value} {unit}
      </span>
      <button
        type="button"
        className="sm-stepper__btn sm-stepper__btn--primary"
        aria-label="Increase group size"
        onClick={() => onChange?.(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
