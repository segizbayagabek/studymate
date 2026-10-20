import Diamond from "../common/Diamond.jsx";
import CourseTag from "../common/CourseTag.jsx";


export default function RequestCard({ request, onJoin }) {

  const dots = [];
  for (let i = 0; i < request.groupSize; i++) {
    const taken = i < request.groupSize - request.seatsLeft;
    dots.push(
      <span key={i} className={"size-[9px] rounded-full " + (taken ? "bg-navy" : "bg-peach")}></span>
    );
  }

  return (
    <article
      className={
        "rounded-[18px] border border-navy/10 bg-paper px-6 py-5.5 " +
        (request.highlight ? "border-l-[3px] border-l-peach shadow-[0_2px_10px_rgba(38,42,84,0.05)]" : "")
      }
    >
      <div className="flex justify-between gap-5">
        {/* Left: course, title, description, details */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <CourseTag code={request.code} dark={request.highlight} />
            <span className={"text-[10px] font-bold tracking-[0.14em] " + (request.highlight ? "text-peach-dark" : "text-muted")}>
              {request.mine ? "YOUR REQUEST" : request.match ? request.match + "% MATCH" : request.level + " LEVEL"}
            </span>
          </div>
          <h3 className="mb-2 text-[19px] font-semibold">{request.title}</h3>
          <p className="mb-3.5 max-w-[56ch] text-[13.5px] font-medium leading-relaxed text-muted">{request.description}</p>
          <div className="flex flex-wrap gap-4 text-[12.5px] font-semibold text-ink">
            <span className="flex items-center gap-2"><Diamond />{request.place}</span>
            <span className="flex items-center gap-2"><Diamond />{request.time}</span>
            <span className="flex items-center gap-2"><Diamond />{request.style}</span>
          </div>
        </div>

        <div className="flex w-42 shrink-0 flex-col items-end justify-between gap-4">
          <div className="text-right">
            <div className="text-[22px] font-bold">{request.seatsLeft}</div>
            <div className="text-[9.5px] font-bold tracking-[0.14em] text-muted">
              {request.seatsLeft === 1 ? "SEAT LEFT" : "SEATS LEFT"}
            </div>
            <div className="mt-2 flex justify-end gap-1">{dots}</div>
          </div>
          {/* You can't join your own request, so show a note instead of the button */}
          {request.mine ? (
            <div className="w-full rounded-full bg-warm p-3 text-center text-[13px] font-bold text-muted">
              Waiting for applicants
            </div>
          ) : request.sent ? (
            <div className="w-full rounded-full bg-warm p-3 text-center text-[13px] font-bold text-muted">
              Request sent
            </div>
          ) : (
            <button
              onClick={onJoin}
              className={
                "w-full rounded-full p-3 text-[13px] font-bold " +
                (request.highlight ? "bg-navy text-white hover:bg-navy-dark" : "border border-navy/20 hover:bg-warm")
              }
            >
              Request to join
            </button>
          )}
        </div>
      </div>

      {/* Bottom: who posted it */}
      <div className="mt-4.5 flex items-center gap-2.5 border-t border-navy/10 pt-4 text-[12.5px]">
        <div className="flex size-7.5 items-center justify-center rounded-full border border-navy/10 bg-warm text-[11px] font-bold">
          {request.owner.initials}
        </div>
        <span className="font-semibold">{request.owner.name}</span>
        <span className="font-medium text-muted">{request.owner.faculty}</span>
        {request.owner.rating && (
          <span className="ml-auto flex items-center gap-1.5 text-[11.5px] font-bold text-ink">
            <Diamond />
            {request.owner.rating} social rating
          </span>
        )}
      </div>
    </article>
  );
}
