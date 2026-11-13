import Label from "../common/Label.jsx";
import { initialsOf } from "../../api.js";
import { t } from "../../i18n.js";

export default function MemberList({ group, user, accepted }) {
  const others = group.memberCount - (accepted ? 1 : 0);

  return (
    <section>
      <Label className="mb-4">{t("group.members")}</Label>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-4 rounded-2xl bg-warm px-6 py-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
            {initialsOf(group.organizer.name)}
          </div>
          <span className="text-[17px] font-semibold">{group.organizer.name}</span>
          <span className="text-[11px] font-bold tracking-[0.14em] text-peach-dark">{t("common.ownerTag")}</span>
        </div>

        {accepted && (
          <div className="flex items-center gap-4 rounded-2xl bg-warm px-6 py-4">
            <div className="flex size-12 items-center justify-center rounded-full border border-navy/15 bg-paper text-sm font-bold">
              {initialsOf(user.name)}
            </div>
            <span className="text-[17px] font-semibold">{t("common.you")}</span>
          </div>
        )}

        {others > 0 && (
          <div className="rounded-2xl border border-dashed border-navy/20 px-6 py-4 text-[15px] font-medium text-muted">
            {t("group.otherMembers", { count: others })}
          </div>
        )}
      </div>
    </section>
  );
}
