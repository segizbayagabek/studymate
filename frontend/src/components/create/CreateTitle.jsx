import Label from "../common/Label.jsx";
import { t } from "../../i18n.js";

export default function CreateTitle() {
  return (
    <div>
      <Label className="mb-3">{t("create.label")}</Label>
      <h1 className="text-[32px] font-semibold">{t("create.title")}</h1>
    </div>
  );
}
