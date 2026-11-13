import { Link } from "react-router-dom";
import GroupCard from "../common/GroupCard.jsx";
import StatusPill from "./StatusPill.jsx";
import { t } from "../../i18n.js";

export default function RequestedList({ requests }) {
  return (
    <section>
      {requests.length === 0 && (
        <div className="rounded-2xl border border-dashed border-navy/20 p-6 text-sm font-medium text-muted">
          {t("requested.none")}{" "}
          <Link to="/browse" className="font-bold text-peach-dark hover:underline">
            {t("requested.browseGroups")}
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3.5">
        {requests.map((request) => (
          <GroupCard
            key={request.id}
            group={request.group}
            label={t("common.matchTag", { score: request.score })}
            badge={<StatusPill request={request} />}
            mine={false}
            to={"/groups/" + request.groupId}
            buttonText={t("requested.openGroup")}
          />
        ))}
      </div>
    </section>
  );
}
