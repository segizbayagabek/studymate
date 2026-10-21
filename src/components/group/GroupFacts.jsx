import { dayLabel, fromEnum, timeRange } from "../../api.js";

function spotText(group) {
  if (group.exactSpot === null) return "Exact spot after you're accepted";
  return group.exactSpot || "No exact spot given";
}

export default function GroupFacts({ group }) {
  const facts = [
    { label: "When", lines: [dayLabel(group.meetingDate), timeRange(group.startTime, group.endTime)] },
    { label: "Where", lines: [fromEnum(group.place), spotText(group)] },
    {
      label: "Group",
      lines: [group.memberCount + 1 + " of " + group.groupSize + " members"],
      muted: group.preferences.map(fromEnum).join(" · ") || "No preferences",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {facts.map((fact) => (
        <div key={fact.label} className="rounded-2xl bg-warm px-6 py-5">
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">{fact.label}</div>
          {fact.lines.map((line) => (
            <div key={line} className="text-[17px] font-semibold">{line}</div>
          ))}
          {fact.muted && <div className="text-[17px] font-medium text-muted">{fact.muted}</div>}
        </div>
      ))}
    </div>
  );
}
