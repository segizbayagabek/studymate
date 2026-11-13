import { Link } from "react-router-dom";
import GroupCard from "../common/GroupCard.jsx";
import { isPast } from "../../api.js";
import { t } from "../../i18n.js";

function statusText(group) {
  if (group.status === "CANCELLED") return t("myGroups.cancelled");
  if (isPast(group)) return t("myGroups.past");
  if (group.status === "FULL") return t("myGroups.full");
  return t("common.seatsLeftTag", { count: group.seatsLeft });
}

export default function OrganizedGroups({ groups }) {
  return (
    <section>
      {groups.length === 0 && (
        <div className="rounded-2xl border border-dashed border-navy/20 p-6 text-sm font-medium text-muted">
          {t("myGroups.none")}{" "}
          <Link to="/create" className="font-bold text-peach-dark hover:underline">
            {t("myGroups.createOne")}
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3.5">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            label={statusText(group)}
            mine={true}
            to={"/groups/" + group.id + "/applicants"}
            buttonText={t("common.seeApplicants")}
          />
        ))}
      </div>
    </section>
  );
}
