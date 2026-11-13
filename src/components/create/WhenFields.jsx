import FieldLabel from "./FieldLabel.jsx";
import Select from "./Select.jsx";
import { useI18n } from "../../i18n.js";

const smallestGroup = 2;
const biggestGroup = 8;

export default function WhenFields({ days, day, setDay, times, time, setTime, groupSize, setGroupSize }) {
  const { lang, t } = useI18n();

  function makeSmaller() {
    if (groupSize > smallestGroup) setGroupSize(groupSize - 1);
  }

  function makeBigger() {
    if (groupSize < biggestGroup) setGroupSize(groupSize + 1);
  }

  const peopleLabel = lang === "RU" ? "чел." : lang === "KZ" ? "адам" : "people";

  return (
    <div className="grid grid-cols-3 gap-5">
      <label>
        <FieldLabel>{t("Day")}</FieldLabel>
        <Select value={day} onChange={setDay} options={days} />
      </label>

      <label>
        <FieldLabel>{t("Time")}</FieldLabel>
        <Select value={time} onChange={setTime} options={times} />
      </label>

      <div>
        <FieldLabel>{t("Group size")}</FieldLabel>
        <div className="flex items-center justify-between rounded-xl border border-navy/10 bg-warm px-2 py-[7px]">
          <button
            type="button"
            onClick={makeSmaller}
            className="flex size-9 items-center justify-center rounded-full border border-navy/15 bg-paper font-bold"
          >
            –
          </button>
          <span className="text-[16px] font-bold">{groupSize} {peopleLabel}</span>
          <button
            type="button"
            onClick={makeBigger}
            className="flex size-9 items-center justify-center rounded-full bg-navy font-bold text-peach"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
