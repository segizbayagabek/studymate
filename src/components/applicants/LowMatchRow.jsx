import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import Panel from "../ui/Panel";
import ScoreBadge from "../ui/ScoreBadge";
import "./LowMatchRow.css";

export default function LowMatchRow({ applicant, onAccept, onDecline }) {
  return (
    <Panel as="article" tone="warm" className="sm-low">
      <div className="sm-low__score">
        <ScoreBadge score={applicant.score} tier="weak" size={58} />
      </div>
      <div className="sm-low__who">
        <Avatar initials={applicant.initials} size={30} tone="light" />
        <div>
          <div className="sm-low__name">{applicant.name}</div>
          <div className="sm-low__faculty">{applicant.faculty}</div>
        </div>
      </div>
      <div className="sm-low__reason">{applicant.reason}</div>
      <div className="sm-low__actions">
        <Button variant="secondary" size="sm" onClick={() => onAccept?.(applicant)}>Accept</Button>
        <Button variant="quiet" size="sm" onClick={() => onDecline?.(applicant)}>Decline</Button>
      </div>
    </Panel>
  );
}
