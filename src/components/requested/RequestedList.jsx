import { Link } from "react-router-dom";
import GroupCard from "../common/GroupCard.jsx";
import StatusPill from "./StatusPill.jsx";

export default function RequestedList({ requests }) {
  return (
    <section>
      {requests.length === 0 && (
        <div className="rounded-2xl border border-dashed border-navy/20 p-6 text-sm font-medium text-muted">
          You haven't asked to join a group yet.{" "}
          <Link to="/browse" className="font-bold text-peach-dark hover:underline">
            Browse groups
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3.5">
        {requests.map((request) => (
          <GroupCard
            key={request.id}
            group={request.group}
            label={request.score + "% MATCH"}
            badge={<StatusPill request={request} />}
            mine={false}
            to={"/groups/" + request.groupId}
            buttonText="Open group"
          />
        ))}
      </div>
    </section>
  );
}
