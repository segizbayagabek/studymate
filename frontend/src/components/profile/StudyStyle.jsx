import Label from "../common/Label.jsx";
import { fromEnum } from "../../api.js";
import { t } from "../../i18n.js";

const styles = ["QUIET_WORK", "MIXED_GROUP", "TALKATIVE"];
const allPlaces = ["LIBRARY", "CANTEEN", "TOP_FLOOR"];

function Row({ title, children }) {
  return (
    <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-navy/10 px-7 py-5">
      <span className="w-40 text-[15px] font-semibold">{title}</span>
      {children}
    </div>
  );
}

function Chip({ chosen, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full px-4 py-2 text-[13px] font-semibold " +
        (chosen ? "bg-navy text-white" : "bg-warm text-muted hover:text-navy")
      }
    >
      {children}
    </button>
  );
}

// onSave gets only what changed, e.g. { studyStyle: "TALKATIVE" }
export default function StudyStyle({ studyStyle, places, onSave }) {
  // Clicking the chosen style again clears it
  function pickStyle(style) {
    onSave({ studyStyle: style === studyStyle ? null : style });
  }

  function togglePlace(place) {
    if (places.includes(place)) {
      onSave({ favouritePlaces: places.filter((p) => p !== place) });
    } else {
      onSave({ favouritePlaces: [...places, place] });
    }
  }

  return (
    <section>
      <Label className="mb-1">{t("profile.studyStyle")}</Label>
      <p className="mb-4 text-[13px] font-medium text-muted">{t("profile.clickToChange")}</p>

      <div className="flex flex-col gap-3">
        <Row title={t("profile.quietOrTalkative")}>
          <div className="flex flex-wrap gap-2">
            {styles.map((style) => (
              <Chip key={style} chosen={style === studyStyle} onClick={() => pickStyle(style)}>
                {fromEnum(style)}
              </Chip>
            ))}
          </div>
        </Row>

        <Row title={t("profile.places")}>
          <div className="flex flex-wrap gap-2">
            {allPlaces.map((place) => (
              <Chip key={place} chosen={places.includes(place)} onClick={() => togglePlace(place)}>
                {fromEnum(place)}
              </Chip>
            ))}
          </div>
        </Row>
      </div>
    </section>
  );
}
