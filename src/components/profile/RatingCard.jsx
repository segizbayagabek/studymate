import Meter from "../ui/Meter";
import ScoreBadge from "../ui/ScoreBadge";
import { useI18n } from "../../i18n.js";
import "./RatingCard.css";

function fromSessionsText(count, lang) {
  if (lang === "RU") return "за " + count + " занятий";
  if (lang === "KZ") return count + " кездесуден";
  return "from " + count + " sessions";
}

export default function RatingCard({ rating, sessionCount, breakdown }) {
  const { lang, t } = useI18n();

  return (
    <div className="sm-rating">
      <div className="sm-rating__head">
        <span className="sm-eyebrow sm-eyebrow--onNavy">{t("Social rating")}</span>
        <span className="sm-rating__from">{fromSessionsText(sessionCount, lang)}</span>
      </div>
      <div className="sm-rating__figure">
        <ScoreBadge score={rating} tier="strong" size={62} suffix="" />
        <p className="sm-rating__note">
          {t("A measure of how you show up — never of what you know.")}
        </p>
      </div>
      <div className="sm-rating__bars">
        {breakdown.map((row) => (
          <Meter key={row.label} label={t(row.label)} value={row.value} max={5} onNavy />
        ))}
      </div>
    </div>
  );
}
