import { dayLabel, fromEnum, timeRange } from "../../api.js";
import { t } from "../../i18n.js";

function spotText(group) {
  if (group.exactSpot === null) return t("group.spotAfterAccept");
  return group.exactSpot || t("group.noSpot");
}

export default function GroupFacts({ group }) {
  const facts = [
    { label: t("group.when"), lines: [dayLabel(group.meetingDate), timeRange(group.startTime, group.endTime)] },
    { label: t("group.where"), lines: [fromEnum(group.place), spotText(group)] },
    {
      label: t("group.group"),
      lines: [t("common.membersOf", { count: group.memberCount + 1, size: group.groupSize })],
      muted: group.preferences.map(fromEnum).join(" · ") || t("common.noPreferences"),
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
