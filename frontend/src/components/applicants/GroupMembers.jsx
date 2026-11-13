import Label from "../common/Label.jsx";
import { initialsOf } from "../../api.js";
import { t } from "../../i18n.js";

export default function GroupMembers({ user, members, group }) {
  return (
    <section className="mt-8">
      <Label className="mb-4">
        {t("applicants.inYourGroup", { count: members.length + 1, size: group.groupSize })}
      </Label>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-4 rounded-2xl bg-warm px-5 py-3.5">
          <div className="flex size-10 items-center justify-center rounded-full bg-navy text-[13px] font-bold text-white">
            {initialsOf(user.name)}
          </div>
          <span className="text-[15px] font-semibold">{t("common.you")}</span>
          <span className="text-[11px] font-bold tracking-[0.14em] text-peach-dark">{t("common.ownerTag")}</span>
        </div>

        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-4 rounded-2xl bg-warm px-5 py-3.5">
            <div className="flex size-10 items-center justify-center rounded-full border border-navy/15 bg-paper text-[13px] font-bold">
              {initialsOf(member.applicant.name)}
            </div>
            <span className="text-[15px] font-semibold">{member.applicant.name}</span>
            <span className="ml-auto text-xs font-bold text-muted">{t("applicants.acceptedMatch", { score: member.score })}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
