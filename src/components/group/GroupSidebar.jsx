import { Link } from "react-router-dom";
import Label from "../common/Label.jsx";
import { fromEnum, whenText } from "../../api.js";

function MeetingPoint({ group }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-paper p-6">
      <Label className="mb-3">Meeting point</Label>
      <p className="text-[16px] leading-snug font-semibold">
        {fromEnum(group.place)}
        {group.exactSpot ? " — " + group.exactSpot : ""}
      </p>
      {group.exactSpot === null && (
        <p className="mt-2 text-[13px] font-medium text-muted">The exact spot appears once the owner accepts you.</p>
      )}
    </div>
  );
}

function StatusBox({ group, myRequest, onJoin, onCancel }) {
  const status = myRequest ? myRequest.status : null;

  if (group.status === "CANCELLED") {
    return <p className="text-[15px] leading-relaxed text-white/80">The owner cancelled this group.</p>;
  }

  if (status === "ACCEPTED") {
    return (
      <p className="text-[15px] leading-relaxed text-white/80">
        You're in — {whenText(group)}. {group.organizer.name} is expecting you.
      </p>
    );
  }

  if (status === "PENDING") {
    return (
      <>
        <p className="text-[15px] leading-relaxed text-white/80">
          Your request is with {group.organizer.name}. Your match score is {myRequest.score}%.
        </p>
        <button onClick={onCancel} className="mt-5 w-full rounded-full border border-white/30 py-3.5 text-sm font-bold text-white hover:bg-white/10">
          Cancel request
        </button>
      </>
    );
  }

  if (status === "REJECTED") {
    return (
      <>
        <p className="text-[15px] leading-relaxed text-white/80">{group.organizer.name} picked other students this time.</p>
        <Link to="/browse" className="mt-5 block w-full rounded-full bg-peach py-3.5 text-center text-sm font-bold text-navy">
          Browse other groups
        </Link>
      </>
    );
  }

  if (group.status === "FULL") {
    return <p className="text-[15px] leading-relaxed text-white/80">This group is already full.</p>;
  }

  return (
    <>
      <p className="text-[15px] leading-relaxed text-white/80">{group.seatsLeft} seats left. Ask to join and the owner will decide.</p>
      <button onClick={onJoin} className="mt-5 w-full rounded-full bg-peach py-3.5 text-sm font-bold text-navy">
        Request to join
      </button>
    </>
  );
}

export default function GroupSidebar({ group, myRequest, onJoin, onCancel }) {
  return (
    <aside className="flex flex-col gap-5 bg-warm px-7 py-10">
      <MeetingPoint group={group} />

      <div className="rounded-2xl bg-navy p-6">
        <Label onDark className="mb-3">Your place in this group</Label>
        <StatusBox group={group} myRequest={myRequest} onJoin={onJoin} onCancel={onCancel} />
      </div>
    </aside>
  );
}
