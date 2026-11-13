import { Link } from "react-router-dom";
import GroupCard from "../common/GroupCard.jsx";
import { isPast } from "../../api.js";
import { useI18n } from "../../i18n.js";

function statusText(group, t) {
  if (group.status === "CANCELLED") return t("CANCELLED");
  if (isPast(group)) return t("PAST");
  if (group.status === "FULL") return t("GROUP FORMED · FULL");
  return group.seatsLeft + " " + (group.seatsLeft === 1 ? t("SEAT LEFT") : t("SEATS LEFT"));
}

export default function OrganizedGroups({ groups }) {
  const { t } = useI18n();

  return (
    <section>
      {groups.length === 0 && (
        <div className="rounded-2xl border border-dashed border-navy/20 p-6 text-sm font-medium text-muted">
          {t("You haven't created a group yet.")}{" "}
          <Link to="/create" className="font-bold text-peach-dark hover:underline">
            {t("Create one")}
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3.5">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            label={statusText(group, t)}
            mine={true}
            to={"/groups/" + group.id + "/applicants"}
            buttonText="See applicants"
            chatTo={group.status === "CANCELLED" ? null : "/chat/" + group.id}
          />
        ))}
      </div>
    </section>
  );
}
