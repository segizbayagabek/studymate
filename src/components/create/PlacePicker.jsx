import Diamond from "../common/Diamond.jsx";
import FieldLabel from "./FieldLabel.jsx";

export default function PlacePicker({ places, place, setPlace, exactSpot, setExactSpot }) {
  return (
    <div>
      <FieldLabel>Place on campus</FieldLabel>

      <div className="grid grid-cols-3 gap-3">
        {places.map((p) => {
          const chosen = p.name === place;
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => setPlace(p.name)}
              className={
                "rounded-2xl px-6 py-5 text-left " +
                (chosen ? "border-2 border-navy bg-paper" : "border border-navy/10 bg-warm hover:border-navy/30")
              }
            >
              <div className="mb-6 flex h-5.5 items-center justify-between">
                <span className={"size-3 rotate-45 " + (chosen ? "bg-peach" : "bg-navy/20")}></span>
                {chosen && (
                  <span className="flex size-5.5 items-center justify-center rounded-full bg-navy text-[10px] text-peach">✓</span>
                )}
              </div>
              <div className="text-[17px] font-semibold">{p.name}</div>
              <div className="text-[13px] font-medium text-muted">{p.note}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-4 rounded-xl bg-warm px-5 py-3.5">
        <span className="text-[13px] font-semibold text-muted">Exact spot</span>
        <input
          value={exactSpot}
          onChange={(e) => setExactSpot(e.target.value)}
          placeholder="2nd floor, table 14"
          className="flex-1 bg-transparent text-[15px] font-medium outline-none placeholder:text-muted/60"
        />
        <span className="flex items-center gap-2 text-xs font-semibold text-peach-dark">
          <Diamond />
          Shown to accepted members only
        </span>
      </div>
    </div>
  );
}
