import { fromEnum } from "../../api.js";
import { t } from "../../i18n.js";

const opposites = {
  QUIET_WORK: "TALKATIVE",
  TALKATIVE: "QUIET_WORK",
  WOMEN_ONLY: "MEN_ONLY",
  MEN_ONLY: "WOMEN_ONLY",
};

export default function PreferenceChips({ preferences, chosen, setChosen }) {
  function toggle(preference) {
    if (chosen.includes(preference)) {
      setChosen(chosen.filter((p) => p !== preference));
    } else {
      const withoutOpposite = chosen.filter((p) => p !== opposites[preference]);
      setChosen([...withoutOpposite, preference]);
    }
  }

  return (
    <div>
      <div className="mb-3 text-[13px] font-semibold text-ink">
        {t("create.preferences")} <span className="font-medium text-muted">{t("create.preferencesHint")}</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {preferences.map((preference) => (
          <button
            key={preference}
            type="button"
            onClick={() => toggle(preference)}
            className={
              "rounded-full px-5 py-3 text-[14px] font-semibold " +
              (chosen.includes(preference)
                ? "bg-navy text-white"
                : "border border-navy/10 bg-warm text-ink hover:border-navy/30")
            }
          >
            {fromEnum(preference)}
          </button>
        ))}
      </div>
    </div>
  );
}
