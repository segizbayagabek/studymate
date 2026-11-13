import { dayLabel, fromEnum, timeRange } from "../../api.js";
import { useI18n } from "../../i18n.js";

function spotText(group, t) {
  if (group.exactSpot === null) return t("Exact spot after you're accepted");
  return group.exactSpot || t("No exact spot given");
}

function membersOfText(current, total, lang) {
  if (lang === "RU") return current + " из " + total + " участников";
  if (lang === "KZ") return total + "-тен " + current + " қатысушы";
  return current + " of " + total + " members";
}

export default function GroupFacts({ group }) {
  const { lang, t } = useI18n();

  const facts = [
    { label: t("When"), lines: [dayLabel(group.meetingDate), timeRange(group.startTime, group.endTime)] },
    { label: t("Where"), lines: [t(fromEnum(group.place)), spotText(group, t)] },
    {
      label: t("Group"),
      lines: [membersOfText(group.memberCount + 1, group.groupSize, lang)],
      muted: group.preferences.map((p) => t(fromEnum(p))).join(" · ") || t("No preferences"),
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
