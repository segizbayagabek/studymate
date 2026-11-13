import FieldLabel from "./FieldLabel.jsx";
import { t } from "../../i18n.js";

export default function DescriptionField({ description, setDescription }) {
  return (
    <label>
      <FieldLabel>{t("create.description")}</FieldLabel>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        placeholder={t("create.descriptionPlaceholder")}
        className="w-full resize-none rounded-xl border border-navy/10 bg-warm px-4 py-3.5 text-[15px] font-medium outline-none placeholder:text-muted/60 focus:border-navy/40"
      />
      <span className="mt-2 block text-xs font-medium text-muted">
        {t("create.descriptionHint")}
      </span>
    </label>
  );
}
