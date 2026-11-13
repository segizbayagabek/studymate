import { t } from "../../i18n.js";

const tiers = {
  strong: { label: t("applicants.strongMatch"), box: "size-26 bg-peach", text: "text-peach-dark" },
  good: { label: t("applicants.goodMatch"), box: "size-26 bg-peach-light", text: "text-muted" },
  low: { label: "", box: "size-17 bg-sand", text: "" },
};

export default function ScoreDiamond({ score }) {
  const tier = score >= 85 ? tiers.strong : score >= 70 ? tiers.good : tiers.low;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className={"flex rotate-45 items-center justify-center rounded-[18px] " + tier.box}>
        <span className="-rotate-45 text-[24px] font-bold">
          {score}
          <span className="text-xs">%</span>
        </span>
      </div>
      {tier.label && (
        <span className={"text-[10.5px] font-bold uppercase tracking-[0.16em] " + tier.text}>{tier.label}</span>
      )}
    </div>
  );
}
