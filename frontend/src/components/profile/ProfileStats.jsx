import Label from "../common/Label.jsx";
import { t } from "../../i18n.js";

export default function ProfileStats({ profile }) {
  const stats = [
    { number: profile.sessionsJoined, label: t("profile.sessionsJoined") },
    { number: profile.groupsOrganized, label: t("profile.groupsOrganized") },
    { number: profile.studentsMet, label: t("profile.studentsMet") },
  ];

  return (
    <div className="rounded-3xl bg-navy p-7 text-white">
      <Label onDark className="mb-6">{t("profile.statsLabel")}</Label>

      <div className="flex flex-col gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-6">
            <div className="ml-2 flex size-13 shrink-0 rotate-45 items-center justify-center rounded-[12px] bg-peach">
              <span className="-rotate-45 text-[20px] font-bold text-navy">{stat.number}</span>
            </div>
            <span className="text-[15px] font-semibold text-white/80">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
