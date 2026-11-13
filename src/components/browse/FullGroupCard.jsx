
import { useI18n } from "../../i18n.js";

export default function FullGroupCard() {
  const { t } = useI18n();

  return (
    <article className="flex items-center justify-between gap-5 rounded-[18px] border border-navy/10 bg-warm px-6 py-5 opacity-80">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-[7px] bg-navy/10 px-2.5 py-1 text-[10.5px] font-bold tracking-wider">PHYS 121</span>
          <span className="text-[10px] font-bold tracking-[0.14em] text-muted">{t("FULL")}</span>
        </div>
        <h3 className="mb-2 text-[19px] font-semibold">{t("Mechanics problem set — Chapter 6 & 7")}</h3>
        <div className="flex gap-4 text-[12.5px] font-semibold text-muted">
          <span>{t("Library · group room B")}</span>
          <span>{t("Today, 19:00 – 20:30")}</span>
          <span>{t("4 of 4 joined")}</span>
        </div>
      </div>
      <button className="rounded-full border border-navy/20 px-5 py-3 text-[13px] font-bold text-muted">
        {t("Notify me if a seat frees")}
      </button>
    </article>
  );
}
