import FieldLabel from "./FieldLabel.jsx";
import { useI18n } from "../../i18n.js";

export default function SubjectFields({ subject, setSubject, code, setCode, title, setTitle }) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-[1.3fr_1fr] gap-5">
        <label>
          <FieldLabel>{t("Subject or course")}</FieldLabel>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={t("e.g. Calculus II")}
            className="w-full rounded-xl border border-navy/10 bg-warm px-4 py-3.5 text-[15px] font-medium outline-none placeholder:text-muted/60 focus:border-navy/40"
          />
        </label>

        <label>
          <FieldLabel>{t("Course code")}</FieldLabel>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t("e.g. MATH 161")}
            className="w-full rounded-xl border border-navy/10 bg-warm px-4 py-3.5 text-[15px] font-medium outline-none placeholder:text-muted/60 focus:border-navy/40"
          />
        </label>
      </div>

      <label>
        <FieldLabel>{t("Short title")}</FieldLabel>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("e.g. practice set together")}
          className="w-full rounded-xl border border-navy/10 bg-warm px-4 py-3.5 text-[15px] font-medium outline-none placeholder:text-muted/60 focus:border-navy/40"
        />
      </label>
    </div>
  );
}
