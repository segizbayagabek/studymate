import { Link } from "react-router-dom";
import CourseTag from "./CourseTag.jsx";
import Diamond from "./Diamond.jsx";
import { fromEnum, whenText } from "../../api.js";

export default function GroupCard({ group, label, badge, mine, to, buttonText }) {
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
          {group.subjectName} — {group.title}
        </h3>
        <div className="flex flex-wrap gap-4 text-[12.5px] font-semibold text-ink">
          <span className="flex items-center gap-2"><Diamond />{fromEnum(group.place)}</span>
          <span className="flex items-center gap-2"><Diamond />{whenText(group)}</span>
          <span className="flex items-center gap-2"><Diamond />{group.memberCount + 1} of {group.groupSize} members</span>
          {!mine && <span className="flex items-center gap-2"><Diamond />Owner: {group.organizer.name}</span>}
        </div>
      </div>

      <Link
        to={to}
        className="shrink-0 rounded-full bg-navy px-6 py-3 text-[13px] font-bold text-white hover:bg-navy-dark"
      >
        {buttonText}
      </Link>
    </article>
  );
}
