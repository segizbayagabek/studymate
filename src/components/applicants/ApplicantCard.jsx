import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import Chip from "../ui/Chip";
import Meter from "../ui/Meter";
import Panel from "../ui/Panel";
import ScoreBadge from "../ui/ScoreBadge";
import "./ApplicantCard.css";

export default function ApplicantCard({ applicant, onAccept, onDecline }) {
  const { score, tier, tierLabel, initials, name, faculty, note, tags, breakdown, hint } = applicant;
  const strong = tier === "strong";

  return (
    <Panel as="article" raised={strong} className="sm-applicant">
      <div className="sm-applicant__score">
        <ScoreBadge score={score} tier={tier} size={74} />
        <span className={`sm-applicant__tier ${strong ? "is-strong" : ""}`}>{tierLabel}</span>
      </div>

      <div className="sm-applicant__who">
        <div className="sm-applicant__id">
          <Avatar initials={initials} size={34} tone={strong ? "navy" : "light"} />
          <div>
            <div className="sm-applicant__name">{name}</div>
            <div className="sm-applicant__faculty">{faculty}</div>
          </div>
        </div>
        <p className="sm-applicant__note">“{note}”</p>
        <div className="sm-applicant__tags">
          {tags.map((tag) => (
            <Chip tone="warm" key={tag}>{tag}</Chip>
          ))}
        </div>
      </div>

      <div className="sm-applicant__breakdown">
        <div className="sm-eyebrow sm-eyebrow--muted">Score breakdown</div>
        {breakdown.map((row) => (
          <Meter key={row.label} label={row.label} value={row.value} accent={row.accent} />
        ))}
        {hint && <div className="sm-applicant__hint">{hint}</div>}
      </div>

      <div className="sm-applicant__actions">
        <Button variant="primary" block onClick={() => onAccept?.(applicant)}>Accept</Button>
        <Button variant="secondary" block onClick={() => onDecline?.(applicant)}>Decline</Button>
        <Link to="/profile" className="sm-applicant__link">View profile</Link>
      </div>
    </Panel>
  );
}
