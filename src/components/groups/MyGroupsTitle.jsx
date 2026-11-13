import Label from "../common/Label.jsx";
import { useI18n } from "../../i18n.js";

function subtitle(count, lang) {
  if (lang === "RU") return count + " " + (count === 1 ? "группа" : "групп") + " · откройте группу, чтобы увидеть заявки";
  if (lang === "KZ") return count + " топ · кім қосылғысы келетінін көру үшін біреуін ашыңыз";
  return count + " " + (count === 1 ? "group" : "groups") + " · open one to see who wants to join";
}

export default function MyGroupsTitle({ count }) {
  const { lang, t } = useI18n();
  return (
    <div>
      <Label className="mb-3">{t("My groups")}</Label>
      <h1 className="text-[32px] font-semibold">{t("Groups you organize")}</h1>
      <p className="mt-2 text-sm font-medium text-muted">
        {subtitle(count, lang)}
      </p>
    </div>
  );
}
