import { useState } from "react";
import Label from "../common/Label.jsx";

export default function BrowseTitle({ count }) {
  const [range, setRange] = useState("today"); 

  return (
    <div className="mb-5 flex items-end justify-between">
      <div>
        <Label className="mb-2">Open requests · Today</Label>
        <h2 className="text-[26px] font-semibold">{count} groups forming on campus</h2>
      </div>
      <div className="flex gap-2 text-xs">
        <button
          onClick={() => setRange("today")}
          className={range === "today" ? "rounded-full bg-navy px-3.5 py-2 font-bold text-white" : "rounded-full border border-navy/15 px-3.5 py-2 font-semibold text-ink"}
        >
          Today
        </button>
        <button
          onClick={() => setRange("week")}
          className={range === "week" ? "rounded-full bg-navy px-3.5 py-2 font-bold text-white" : "rounded-full border border-navy/15 px-3.5 py-2 font-semibold text-ink"}
        >
          This week
        </button>
      </div>
    </div>
  );
}
