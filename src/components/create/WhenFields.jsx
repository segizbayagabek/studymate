import FieldLabel from "./FieldLabel.jsx";
import { useI18n } from "../../i18n.js";

const smallestGroup = 2;
const biggestGroup = 8;

const inputClass =
  "w-full rounded-xl border border-navy/10 bg-warm px-4 py-3.5 text-[15px] font-medium outline-none focus:border-navy/40";

export default function WhenFields({
  minDate,
  meetingDate,
  setMeetingDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  groupSize,
  setGroupSize,
}) {
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
        <input
          type="date"
          value={meetingDate}
          min={minDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          className={inputClass}
        />
      </label>

      <div>
        <FieldLabel>{t("Time")}</FieldLabel>
        <div className="flex items-center gap-2">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            aria-label="Start time"
            className={inputClass}
          />
          <span className="text-muted">–</span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            aria-label="End time"
            className={inputClass}
          />
        </div>
      </div>

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
