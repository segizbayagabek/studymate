import Label from "../common/Label.jsx";
import { useI18n } from "../../i18n.js";

export default function CreateTitle() {
  const { t } = useI18n();
  return (
    <div>
      <Label className="mb-3">{t("New request")}</Label>
      <h1 className="text-[32px] font-semibold">{t("What are you studying, and where?")}</h1>
    </div>
  );
}
