import Label from "../common/Label.jsx";
import { t } from "../../i18n.js";

export default function MyGroupsTitle({ count }) {
  return (
    <div>
      <Label className="mb-3">{t("myGroups.label")}</Label>
      <h1 className="text-[32px] font-semibold">{t("myGroups.title")}</h1>
      <p className="mt-2 text-sm font-medium text-muted">
        {t("myGroups.count", { count: count })}
      </p>
    </div>
  );
}
