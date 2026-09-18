import Meter from "../ui/Meter";
import ScoreBadge from "../ui/ScoreBadge";
import "./RatingCard.css";

export default function RatingCard({ rating, sessionCount, breakdown }) {
  return (
    <div className="sm-rating">
      <div className="sm-rating__head">
        <span className="sm-eyebrow sm-eyebrow--onNavy">Social rating</span>
        <span className="sm-rating__from">from {sessionCount} sessions</span>
      </div>
      <div className="sm-rating__figure">
        <ScoreBadge score={rating} tier="strong" size={62} suffix="" />
        <p className="sm-rating__note">
          A measure of how you show up — never of what you know.
        </p>
      </div>
      <div className="sm-rating__bars">
        {breakdown.map((row) => (
          <Meter key={row.label} label={row.label} value={row.value} max={5} onNavy />
        ))}
      </div>
    </div>
  );
}
