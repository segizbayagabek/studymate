import Diamond from "../common/Diamond.jsx";
import { t } from "../../i18n.js";

export default function PrivacyNote({ accepted }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-peach px-6 py-4">
      <Diamond className="size-2.5" />
      <span className="flex-1 text-[15px] font-semibold">
        {accepted
          ? t("group.spotVisible")
          : t("group.spotHidden")}
      </span>
      <span className="text-[13px] font-medium text-muted">{t("group.hiddenFromFeed")}</span>
    </div>
  );
}
