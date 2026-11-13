import Label from "../common/Label.jsx";
import { initialsOf } from "../../api.js";
import { useI18n } from "../../i18n.js";

function inYourGroupLabel(current, total, lang) {
  if (lang === "RU") return "В вашей группе · " + current + " из " + total;
  if (lang === "KZ") return "Тобыңызда · " + total + "-тен " + current;
  return "In your group · " + current + " of " + total;
}

function acceptedScoreLabel(score, lang) {
  if (lang === "RU") return "Принят(а) · " + score + "% совпадение";
  if (lang === "KZ") return "Қабылданды · " + score + "% сәйкестік";
  return "Accepted · " + score + "% match";
}

export default function GroupMembers({ user, members, group }) {
  const { lang, t } = useI18n();

  return (
    <section className="mt-8">
      <Label className="mb-4">
        {inYourGroupLabel(members.length + 1, group.groupSize, lang)}
      </Label>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-4 rounded-2xl bg-warm px-5 py-3.5">
          <div className="flex size-10 items-center justify-center rounded-full bg-navy text-[13px] font-bold text-white">
            {initialsOf(user.name)}
          </div>
          <span className="text-[15px] font-semibold">{t("You")}</span>
          <span className="text-[11px] font-bold tracking-[0.14em] text-peach-dark">{t("OWNER")}</span>
        </div>

        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-4 rounded-2xl bg-warm px-5 py-3.5">
            <div className="flex size-10 items-center justify-center rounded-full border border-navy/15 bg-paper text-[13px] font-bold">
              {initialsOf(member.applicant.name)}
            </div>
            <span className="text-[15px] font-semibold">{member.applicant.name}</span>
            <span className="ml-auto text-xs font-bold text-muted">{acceptedScoreLabel(member.score, lang)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
