import CourseTag from "../common/CourseTag.jsx";
import Diamond from "../common/Diamond.jsx";
import { fromEnum, whenText } from "../../api.js";
import { useI18n } from "../../i18n.js";

const sortOptions = [
  { value: "compatibility", label: "Compatibility" },
  { value: "newest", label: "Newest" },
];

function statusText(group, t) {
  if (group.status === "CANCELLED") return t("YOUR REQUEST · CANCELLED");
  if (group.status === "FULL") return t("YOUR REQUEST · GROUP IS FULL");
  return t("YOUR REQUEST") + " · " + group.seatsLeft + " " + (group.seatsLeft === 1 ? t("SEAT LEFT") : t("SEATS LEFT"));
}

function heading(count, subject, lang, t) {
  const subj = t(subject);
  if (lang === "RU") {
    if (count === 0) return "Нет новых заявок в вашу группу по «" + subj + "»";
    if (count === 1) return "1 студент хочет вступить в вашу группу по «" + subj + "»";
    return count + " студентов хотят вступить в вашу группу по «" + subj + "»";
  }
  if (lang === "KZ") {
    if (count === 0) return "«" + subj + "» тобыңызға жаңа өтінімдер жоқ";
    return count + " студент «" + subj + "» тобыңызға қосылғысы келеді";
  }
  if (count === 0) return "No new requests for your " + subj + " group";
  if (count === 1) return "1 student wants to join your " + subj + " group";
  return count + " students want to join your " + subj + " group";
}

export default function ApplicantsTitle({ group, count, sort, setSort }) {
  const { lang, t } = useI18n();
  const where = group.exactSpot ? t(fromEnum(group.place)) + " · " + group.exactSpot : t(fromEnum(group.place));

  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-6">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <CourseTag code={group.courseCode} dark />
          <span className="text-[11px] font-bold tracking-[0.14em] text-peach-dark">{statusText(group, t)}</span>
        </div>
        <h1 className="text-[32px] font-semibold">{heading(count, group.subjectName, lang, t)}</h1>
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
            {t(option.label)}
          </button>
        ))}
      </div>
    </div>
  );
}
