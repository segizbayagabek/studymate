import Label from "../common/Label.jsx";
import { isPast } from "../../api.js";
import { useI18n } from "../../i18n.js";

function subtitle(waiting, accepted, lang) {
  if (lang === "RU") return waiting + " ожидают ответа · " + accepted + " принято";
  if (lang === "KZ") return waiting + " жауап күтуде · " + accepted + " қабылданды";
  return waiting + " waiting for an answer · " + accepted + " accepted";
}

export default function RequestedTitle({ requests }) {
  const { lang, t } = useI18n();
  const waiting = requests.filter((r) => r.status === "PENDING" && !isPast(r.group)).length;
  const accepted = requests.filter((r) => r.status === "ACCEPTED").length;

  return (
    <div>
      <Label className="mb-3">{t("Requested")}</Label>
      <h1 className="text-[32px] font-semibold">{t("Groups you asked to join")}</h1>
      <p className="mt-2 text-sm font-medium text-muted">
        {subtitle(waiting, accepted, lang)}
      </p>
    </div>
  );
}
