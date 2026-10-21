import CourseTag from "../common/CourseTag.jsx";
import Diamond from "../common/Diamond.jsx";
import { fromEnum, whenText } from "../../api.js";

const sortOptions = [
  { value: "compatibility", label: "Compatibility" },
  { value: "newest", label: "Newest" },
];

function statusText(group) {
  if (group.status === "CANCELLED") return "YOUR REQUEST · CANCELLED";
  if (group.status === "FULL") return "YOUR REQUEST · GROUP IS FULL";
  return "YOUR REQUEST · " + group.seatsLeft + (group.seatsLeft === 1 ? " SEAT LEFT" : " SEATS LEFT");
}

function heading(count, subject) {
  if (count === 0) return "No new requests for your " + subject + " group";
  if (count === 1) return "1 student wants to join your " + subject + " group";
  return count + " students want to join your " + subject + " group";
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
