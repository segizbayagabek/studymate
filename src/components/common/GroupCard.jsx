import { Link } from "react-router-dom";
import CourseTag from "./CourseTag.jsx";
import Diamond from "./Diamond.jsx";
import { fromEnum, whenText } from "../../api.js";
import { useI18n } from "../../i18n.js";

function membersOfText(current, total, lang) {
  if (lang === "RU") return current + " из " + total + " участников";
  if (lang === "KZ") return total + "-тен " + current + " қатысушы";
  return current + " of " + total + " members";
}

function ownerLabel(name, lang) {
  if (lang === "RU") return "Организатор: " + name;
  if (lang === "KZ") return "Ұйымдастырушы: " + name;
  return "Owner: " + name;
}

export default function GroupCard({ group, label, badge, mine, to, buttonText, chatTo }) {
  const { lang, t } = useI18n();

  return (
    <article
      className={
        "flex items-center justify-between gap-6 rounded-l-md rounded-r-[18px] border border-l-[3px] border-navy/10 bg-paper px-6 py-5 " +
        (mine ? "border-l-peach" : "border-l-navy")
      }
    >
      <div>
        <div className="mb-2 flex items-center gap-2">
          <CourseTag code={group.courseCode} dark />
          {badge}
          {label && (
            <span className={"text-[10px] font-bold tracking-[0.14em] " + (mine ? "text-peach-dark" : "text-navy")}>
              {label}
            </span>
          )}
        </div>
        <h3 className="mb-2 text-[19px] font-semibold">
          {t(group.subjectName)} — {group.title}
        </h3>
        <div className="flex flex-wrap gap-4 text-[12.5px] font-semibold text-ink">
          <span className="flex items-center gap-2"><Diamond />{t(fromEnum(group.place))}</span>
          <span className="flex items-center gap-2"><Diamond />{whenText(group)}</span>
          <span className="flex items-center gap-2"><Diamond />{membersOfText(group.memberCount + 1, group.groupSize, lang)}</span>
          {!mine && <span className="flex items-center gap-2"><Diamond />{ownerLabel(group.organizer.name, lang)}</span>}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {chatTo && (
          <Link
            to={chatTo}
            className="rounded-full border border-navy/15 px-5 py-3 text-[13px] font-bold text-navy hover:bg-warm"
          >
            {t("Chat")}
          </Link>
        )}
        <Link
          to={to}
          className="rounded-full bg-navy px-6 py-3 text-[13px] font-bold text-white hover:bg-navy-dark"
        >
          {t(buttonText)}
        </Link>
      </div>
    </article>
  );
}
