import "./Meter.css";

/** A labelled score bar. Used in applicant breakdowns and the rating card. */
export default function Meter({ label, value, max = 100, accent = false, onNavy = false, displayValue }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`sm-meter ${onNavy ? "sm-meter--onNavy" : ""}`}>
      <div className="sm-meter__head">
        <span className="sm-meter__label">{label}</span>
        {onNavy && <span className="sm-meter__num">{displayValue ?? value}</span>}
      </div>
      <div className="sm-meter__track">
        <div
          className={`sm-meter__fill ${accent || onNavy ? "sm-meter__fill--accent" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {!onNavy && <span className="sm-meter__num">{displayValue ?? value}</span>}
    </div>
  );
}
