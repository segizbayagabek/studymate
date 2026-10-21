import ScoreDiamond from "./ScoreDiamond.jsx";
import { fromEnum, initialsOf } from "../../api.js";

function minutes(time) {
  return Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
}

function reasonsFor(applicant, group) {
  const reasons = [];

  if (applicant.breakdown.subject < 100) {
    reasons.push("studies " + applicant.courseCode);
  }
  if (applicant.breakdown.time < 100) {
    const start = Math.max(minutes(group.startTime), minutes(applicant.availableFrom));
    const end = Math.min(minutes(group.endTime), minutes(applicant.availableTo));
    reasons.push("time overlap only " + Math.max(0, end - start) + " min");
  }
  if (applicant.breakdown.level < 100) {
    reasons.push(fromEnum(applicant.level).toLowerCase() + " level");
  }
  if (applicant.breakdown.preferences < 100) {
    reasons.push(
      applicant.preferences.length > 0
        ? "prefers " + applicant.preferences.map((p) => fromEnum(p).toLowerCase()).join(", ")
        : "picked no study preferences"
    );
  }

  const text = reasons.join(" · ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function LowMatchRow({ applicant, group, canAccept, onAccept, onDecline }) {
  return (
    <article className="grid grid-cols-[140px_1fr_auto_auto] items-center gap-8 rounded-[22px] border border-navy/10 bg-warm px-8 py-5">
      <ScoreDiamond score={applicant.score} />

      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-navy/15 bg-paper text-[13px] font-bold">
          {initialsOf(applicant.applicant.name)}
        </div>
        <div>
          <div className="text-[17px] font-semibold">{applicant.applicant.name}</div>
          <div className="text-[13px] font-medium text-muted">{fromEnum(applicant.level)} level</div>
        </div>
      </div>

      <p className="max-w-[44ch] text-sm font-medium text-muted">{reasonsFor(applicant, group)}</p>

      <div className="flex gap-2">
        <button
          onClick={onAccept}
          disabled={!canAccept}
          className="rounded-full border border-navy/20 px-6 py-3 text-sm font-bold hover:bg-paper disabled:opacity-40"
        >
          Accept
        </button>
        <button onClick={onDecline} className="rounded-full border border-navy/10 px-6 py-3 text-sm font-semibold text-muted hover:bg-paper">
          Decline
        </button>
      </div>
    </article>
  );
}
