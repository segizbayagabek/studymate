import ScoreDiamond from "./ScoreDiamond.jsx";
import ScoreBreakdown from "./ScoreBreakdown.jsx";
import { fromEnum, initialsOf, timeRange } from "../../api.js";
import { useI18n } from "../../i18n.js";

function hintFor(applicant, t) {
  if (applicant.breakdown.level < 60) return t("Level gap is wide — a good chance to teach.");
  if (applicant.breakdown.time < 100) return t("Only part of the session fits their free time.");
  return "";
}

function levelAndFreeText(applicant, lang, t) {
  const lvl = t(fromEnum(applicant.level));
  const range = timeRange(applicant.availableFrom, applicant.availableTo);
  if (lang === "RU") return lvl + " уровень · свободен(на) " + range;
  if (lang === "KZ") return lvl + " деңгей · бос уақыты " + range;
  return lvl + " level · free " + range;
}

export default function ApplicantCard({ applicant, canAccept, onAccept, onDecline }) {
  const { lang, t } = useI18n();
  const strong = applicant.score >= 85;

  return (
    <article className="grid grid-cols-[140px_1fr_320px_220px] items-center gap-8 rounded-[22px] border border-navy/10 bg-paper px-8 py-7 shadow-[0_2px_10px_rgba(38,42,84,0.05)]">
      <ScoreDiamond score={applicant.score} />

      <div>
        <div className="flex items-center gap-3">
          <div
            className={
              "flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold " +
              (strong ? "bg-navy text-white" : "border border-navy/15 bg-warm")
            }
          >
            {initialsOf(applicant.applicant.name)}
          </div>
          <div>
            <div className="text-[19px] font-semibold">{applicant.applicant.name}</div>
            <div className="text-[13.5px] font-medium text-muted">
              {levelAndFreeText(applicant, lang, t)}
            </div>
          </div>
        </div>

        {applicant.note && (
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed font-medium text-ink">“{applicant.note}”</p>
        )}

        {applicant.preferences.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {applicant.preferences.map((preference) => (
              <span key={preference} className="rounded-full bg-warm px-3.5 py-1.5 text-[12.5px] font-semibold text-ink">
                {t(fromEnum(preference))}
              </span>
            ))}
          </div>
        )}
      </div>

      <ScoreBreakdown breakdown={applicant.breakdown} hint={hintFor(applicant, t)} />

      <div className="flex flex-col gap-3">
        <button
          onClick={onAccept}
          disabled={!canAccept}
          className="rounded-full bg-navy py-4 text-sm font-bold text-white hover:bg-navy-dark disabled:opacity-40"
        >
          {t("Accept")}
        </button>
        <button onClick={onDecline} className="rounded-full border border-navy/15 py-4 text-sm font-semibold hover:bg-warm">
          {t("Decline")}
        </button>
      </div>
    </article>
  );
}
