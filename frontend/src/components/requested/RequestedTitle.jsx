import Label from "../common/Label.jsx";
import { isPast } from "../../api.js";
import { t } from "../../i18n.js";

export default function RequestedTitle({ requests }) {
  const waiting = requests.filter((r) => r.status === "PENDING" && !isPast(r.group)).length;
  const accepted = requests.filter((r) => r.status === "ACCEPTED").length;

  return (
    <div>
      <Label className="mb-3">{t("requested.label")}</Label>
      <h1 className="text-[32px] font-semibold">{t("requested.title")}</h1>
      <p className="mt-2 text-sm font-medium text-muted">
        {t("requested.summary", { waiting: waiting, accepted: accepted })}
      </p>
    </div>
  );
}
