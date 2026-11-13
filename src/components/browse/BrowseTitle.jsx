import { useState } from "react";
import Label from "../common/Label.jsx";
import { useI18n } from "../../i18n.js";

function formingHeading(count, lang) {
  if (lang === "RU") return count + " " + (count === 1 ? "группа формируется" : "групп формируется") + " в кампусе";
  if (lang === "KZ") return "Кампуста " + count + " топ жиналуда";
  return count + " " + (count === 1 ? "group" : "groups") + " forming on campus";
}

export default function BrowseTitle({ count }) {
  const { lang, t } = useI18n();
  const [range, setRange] = useState("today");

  return (
    <div className="mb-5 flex items-end justify-between">
      <div>
        <Label className="mb-2">{t("Open requests · Today")}</Label>
        <h2 className="text-[26px] font-semibold">{formingHeading(count, lang)}</h2>
      </div>
      <div className="flex gap-2 text-xs">
        <button
          onClick={() => setRange("today")}
          className={range === "today" ? "rounded-full bg-navy px-3.5 py-2 font-bold text-white" : "rounded-full border border-navy/15 px-3.5 py-2 font-semibold text-ink"}
        >
          {t("Today")}
        </button>
        <button
          onClick={() => setRange("week")}
          className={range === "week" ? "rounded-full bg-navy px-3.5 py-2 font-bold text-white" : "rounded-full border border-navy/15 px-3.5 py-2 font-semibold text-ink"}
        >
          {t("This week")}
        </button>
      </div>
    </div>
  );
}
