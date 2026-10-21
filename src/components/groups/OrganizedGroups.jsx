import { Link } from "react-router-dom";
import GroupCard from "../common/GroupCard.jsx";
import { isPast } from "../../api.js";

function statusText(group) {
  if (group.status === "CANCELLED") return "CANCELLED";
  if (isPast(group)) return "PAST";
  if (group.status === "FULL") return "GROUP FORMED · FULL";
  return group.seatsLeft + (group.seatsLeft === 1 ? " SEAT LEFT" : " SEATS LEFT");
}

export default function OrganizedGroups({ groups }) {
  return (
    <section>
      {groups.length === 0 && (
        <div className="rounded-2xl border border-dashed border-navy/20 p-6 text-sm font-medium text-muted">
          You haven't created a group yet.{" "}
          <Link to="/create" className="font-bold text-peach-dark hover:underline">
            Create one
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
            buttonText="See applicants"
          />
        ))}
      </div>
    </section>
  );
}
