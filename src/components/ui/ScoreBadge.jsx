import "./ScoreBadge.css";

/** The rotated diamond score badge. tier: "strong" | "good" | "weak" */
export default function ScoreBadge({ score, tier = "strong", size = 74, suffix = "%" }) {
  return (
    <span className={`sm-score sm-score--${tier}`} style={{ width: size, height: size }}>
      <span className="sm-score__value" style={{ fontSize: Math.round(size * 0.28) }}>
        {score}
        <span className="sm-score__suffix">{suffix}</span>
      </span>
    </span>
  );
}
