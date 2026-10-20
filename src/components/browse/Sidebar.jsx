import { Link } from "react-router-dom";
import Diamond from "../common/Diamond.jsx";
import Label from "../common/Label.jsx";

const pickedForYou = [
  { title: "Discrete Math — proof drills", info: "Library · 15:00 · 94% match" },
  { title: "Kazakh History — seminar prep", info: "Canteen · 13:00 · 87% match" },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-4.5 bg-warm px-6 py-8">
      {/* Your week */}
      <div className="rounded-2xl bg-navy p-5.5">
        <Label onDark className="mb-3">Your week</Label>
        <div className="flex items-baseline gap-2">
          <span className="text-[34px] font-bold text-white">3</span>
          <span className="text-[13px] font-semibold text-white/70">sessions joined</span>
        </div>
        <p className="mt-3 text-[12.5px] font-medium leading-relaxed text-white/70">
          You taught twice this week. Teaching raises your helpfulness rating.
        </p>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-paper p-5">
        <Label className="mb-3.5">Picked for you</Label>
        <div className="flex flex-col gap-3.5">
          {pickedForYou.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="flex size-8.5 shrink-0 items-center justify-center rounded-[9px] bg-warm">
                <Diamond className="size-2.5" />
              </div>
              <div>
                <div className="text-[13px] font-semibold">{item.title}</div>
                <div className="text-[11.5px] font-medium text-muted">{item.info}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-navy/20 bg-paper p-5">
        <div className="mb-1.5 text-sm font-semibold">Nothing fits your schedule?</div>
        <p className="mb-3.5 text-[12.5px] font-medium leading-relaxed text-muted">
          Post your own request — most groups fill within two hours.
        </p>
        <Link to="/create" className="block w-full rounded-full bg-peach p-3 text-center text-[13px] font-bold">
          Create a study request
        </Link>
      </div>

      <div className="mt-auto font-serif text-[12.5px] italic text-muted">“Docendo discimus.”</div>
    </aside>
  );
}
