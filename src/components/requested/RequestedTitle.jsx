import Label from "../common/Label.jsx";
import { isPast } from "../../api.js";

export default function RequestedTitle({ requests }) {
  const waiting = requests.filter((r) => r.status === "PENDING" && !isPast(r.group)).length;
  const accepted = requests.filter((r) => r.status === "ACCEPTED").length;

  return (
    <div>
      <Label className="mb-3">Requested</Label>
      <h1 className="text-[32px] font-semibold">Groups you asked to join</h1>
      <p className="mt-2 text-sm font-medium text-muted">
        {waiting} waiting for an answer · {accepted} accepted
      </p>
    </div>
  );
}
