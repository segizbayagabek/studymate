import { t } from "../../i18n.js";

export default function FullGroupCard() {
  return (
    <article className="flex items-center justify-between gap-5 rounded-[18px] border border-navy/10 bg-warm px-6 py-5 opacity-80">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-[7px] bg-navy/10 px-2.5 py-1 text-[10.5px] font-bold tracking-wider">PHYS 121</span>
          <span className="text-[10px] font-bold tracking-[0.14em] text-muted">{t("browse.full")}</span>
        </div>
        <h3 className="mb-2 text-[19px] font-semibold">{t("browse.fullTitle")}</h3>
        <div className="flex gap-4 text-[12.5px] font-semibold text-muted">
          <span>{t("browse.fullPlace")}</span>
          <span>{t("browse.fullTime")}</span>
          <span>{t("browse.fullJoined")}</span>
        </div>
      </div>
      <button className="rounded-full border border-navy/20 px-5 py-3 text-[13px] font-bold text-muted">
        {t("browse.notifyMe")}
      </button>
    </article>
  );
}
