import Diamond from "../common/Diamond.jsx";
import { t } from "../../i18n.js";

export default function StatsNote() {
  return (
    <div className="flex items-start gap-3">
      <Diamond className="mt-1.5" />
      <p className="text-[13px] font-medium leading-relaxed text-muted">{t("profile.statsNote")}</p>
    </div>
  );
}
