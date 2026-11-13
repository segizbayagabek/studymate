import { Link } from "react-router-dom";
import Label from "../common/Label.jsx";
import Diamond from "../common/Diamond.jsx";
import { dayLabel, fromEnum } from "../../api.js";
import { t } from "../../i18n.js";

// sessions = [{ groupId, title, subjectName, place, meetingDate, organized }], newest first
export default function RecentSessions({ sessions }) {
  return (
    <section>
      <Label className="mb-2">{t("profile.recentSessions")}</Label>

      {sessions.length === 0 && (
        <p className="mt-2 rounded-2xl border border-dashed border-navy/20 p-6 text-sm font-medium text-muted">
          {t("profile.noSessions")}
        </p>
      )}

      {sessions.map((session) => (
        <Link
          key={session.groupId}
          to={session.organized ? "/groups/" + session.groupId + "/applicants" : "/groups/" + session.groupId}
          className="flex items-center gap-4 border-b border-navy/10 py-5 last:border-b-0 hover:bg-warm/60"
        >
          <Diamond className="size-2.5" />
          <span className="flex-1 text-[16px] font-semibold">
            {session.subjectName} — {session.title}
          </span>
          <span className="text-[14px] font-medium text-muted">
            {fromEnum(session.place)} · {dayLabel(session.meetingDate)}
          </span>
          <span
            className={"w-36 text-right text-[14px] font-semibold " + (session.organized ? "text-peach-dark" : "text-ink")}
          >
            {session.organized ? t("profile.youOrganised") : t("profile.youJoined")}
          </span>
        </Link>
      ))}
    </section>
  );
}
