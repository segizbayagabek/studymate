import Chip from "../ui/Chip";
import { useI18n } from "../../i18n.js";
import "./StudyStyle.css";

export default function StudyStyle({ quietness = 32, places = [] }) {
  const { t } = useI18n();

  return (
    <div className="sm-style">
      <div className="sm-style__row">
        <span className="sm-style__label">{t("Quiet vs. talkative")}</span>
        <div className="sm-style__slider">
          <div className="sm-style__fill" style={{ width: `${quietness}%` }} />
          <div className="sm-style__knob" style={{ left: `${quietness}%` }} />
        </div>
        <span className="sm-style__value">{t("Mostly quiet")}</span>
      </div>
      <div className="sm-style__row">
        <span className="sm-style__label">{t("Preferred places")}</span>
        <div className="sm-style__places">
          {places.map((place) => (
            <Chip key={place.label} tone={place.active ? "active" : "default"}>
              {place.label}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
