import { isPast } from "../../api.js";

const statuses = {
  PENDING: { text: "Waiting for the owner", colors: "bg-honey-light text-honey" },
  ACCEPTED: { text: "You're in", colors: "bg-sage-light text-sage" },
  REJECTED: { text: "Not accepted", colors: "bg-clay-light text-clay" },
  PAST: { text: "Date has passed", colors: "bg-sand text-ink" },
  CANCELLED: { text: "Cancelled by the owner", colors: "bg-sand text-ink" },
};

function statusOf(request) {
  if (request.group.status === "CANCELLED") return statuses.CANCELLED;
  if (isPast(request.group)) return statuses.PAST;
  return statuses[request.status];
}

export default function StatusPill({ request }) {
  const status = statusOf(request);

  return (
    <span className={"flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold " + status.colors}>
      <span className="size-1.5 rounded-full bg-current"></span>
      {status.text}
    </span>
  );
}
