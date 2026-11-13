import { Link } from "react-router-dom";
import Label from "../common/Label.jsx";
import { fromEnum, whenText } from "../../api.js";
import { useI18n } from "../../i18n.js";

function MeetingPoint({ group, t }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-paper p-6">
      <Label className="mb-3">{t("Meeting point")}</Label>
      <p className="text-[16px] leading-snug font-semibold">
        {t(fromEnum(group.place))}
        {group.exactSpot ? " — " + group.exactSpot : ""}
      </p>
      {group.exactSpot === null && (
        <p className="mt-2 text-[13px] font-medium text-muted">{t("The exact spot appears once the owner accepts you.")}</p>
      )}
    </div>
  );
}

function StatusBox({ group, myRequest, onJoin, onCancel, lang, t }) {
  const status = myRequest ? myRequest.status : null;

  if (group.status === "CANCELLED") {
    return <p className="text-[15px] leading-relaxed text-white/80">{t("The owner cancelled this group.")}</p>;
  }

  if (status === "ACCEPTED") {
    const text =
      lang === "RU"
        ? "Вы в группе — " + whenText(group) + ". " + group.organizer.name + " ждёт вас."
        : lang === "KZ"
        ? "Сіз топтасыз — " + whenText(group) + ". " + group.organizer.name + " сізді күтуде."
        : "You're in — " + whenText(group) + ". " + group.organizer.name + " is expecting you.";
    return <p className="text-[15px] leading-relaxed text-white/80">{text}</p>;
  }

  if (status === "PENDING") {
    const text =
      lang === "RU"
        ? "Ваша заявка у " + group.organizer.name + ". Совместимость: " + myRequest.score + "%."
        : lang === "KZ"
        ? "Сіздің өтініміңіз " + group.organizer.name + " қарауында. Сәйкестік: " + myRequest.score + "%."
        : "Your request is with " + group.organizer.name + ". Your match score is " + myRequest.score + "%.";
    return (
      <>
        <p className="text-[15px] leading-relaxed text-white/80">{text}</p>
        <button onClick={onCancel} className="mt-5 w-full rounded-full border border-white/30 py-3.5 text-sm font-bold text-white hover:bg-white/10">
          {t("Cancel request")}
        </button>
      </>
    );
  }

  if (status === "REJECTED") {
    const text =
      lang === "RU"
        ? group.organizer.name + " в этот раз выбрал(а) других студентов."
        : lang === "KZ"
        ? group.organizer.name + " бұл жолы басқа студенттерді таңдады."
        : group.organizer.name + " picked other students this time.";
    return (
      <>
        <p className="text-[15px] leading-relaxed text-white/80">{text}</p>
        <Link to="/browse" className="mt-5 block w-full rounded-full bg-peach py-3.5 text-center text-sm font-bold text-navy">
          {t("Browse other groups")}
        </Link>
      </>
    );
  }

  if (group.status === "FULL") {
    return <p className="text-[15px] leading-relaxed text-white/80">{t("This group is already full.")}</p>;
  }

  const openText =
    lang === "RU"
      ? "Осталось мест: " + group.seatsLeft + ". Подайте заявку, и организатор примет решение."
      : lang === "KZ"
      ? group.seatsLeft + " орын қалды. Өтінім беріңіз, ұйымдастырушы шешім қабылдайды."
      : group.seatsLeft + " seats left. Ask to join and the owner will decide.";

  return (
    <>
      <p className="text-[15px] leading-relaxed text-white/80">{openText}</p>
      <button onClick={onJoin} className="mt-5 w-full rounded-full bg-peach py-3.5 text-sm font-bold text-navy">
        {t("Request to join")}
      </button>
    </>
  );
}

export default function GroupSidebar({ group, myRequest, onJoin, onCancel }) {
  const { lang, t } = useI18n();

  return (
    <aside className="flex flex-col gap-5 bg-warm px-7 py-10">
      <MeetingPoint group={group} t={t} />

      <div className="rounded-2xl bg-navy p-6">
        <Label onDark className="mb-3">{t("Your place in this group")}</Label>
        <StatusBox group={group} myRequest={myRequest} onJoin={onJoin} onCancel={onCancel} lang={lang} t={t} />
      </div>
    </aside>
  );
}
