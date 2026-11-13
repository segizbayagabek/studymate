import CourseTag from "../common/CourseTag.jsx";
import Diamond from "../common/Diamond.jsx";
import { fromEnum, whenText } from "../../api.js";
import { t } from "../../i18n.js";

const sortOptions = [
  { value: "compatibility", label: t("applicants.compatibility") },
  { value: "newest", label: t("applicants.newest") },
];

function statusText(group) {
  if (group.status === "CANCELLED") return t("applicants.statusCancelled");
  if (group.status === "FULL") return t("applicants.statusFull");
  return t("applicants.statusSeats", { count: group.seatsLeft });
}

function heading(count, subject) {
  if (count === 0) return t("applicants.headingNone", { subject: subject });
  return t("applicants.heading", { count: count, subject: subject });
}

export default function ApplicantsTitle({ group, count, sort, setSort }) {
  const where = group.exactSpot ? fromEnum(group.place) + " · " + group.exactSpot : fromEnum(group.place);

  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-6">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <CourseTag code={group.courseCode} dark />
          <span className="text-[11px] font-bold tracking-[0.14em] text-peach-dark">{statusText(group)}</span>
        </div>
        <h1 className="text-[32px] font-semibold">{heading(count, group.subjectName)}</h1>
        <p className="mt-1 text-[15px] font-medium text-muted">
          {where} · {whenText(group)}
        </p>
      </div>

      <div className="flex gap-2 text-sm">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSort(option.value)}
            className={
              option.value === sort
                ? "flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 font-bold text-white"
                : "rounded-full border border-navy/15 px-5 py-2.5 font-semibold text-ink hover:bg-warm"
            }
          >
            {option.value === sort && <Diamond />}
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
