import CourseTag from "../common/CourseTag.jsx";
import Diamond from "../common/Diamond.jsx";
import Label from "../common/Label.jsx";

export default function PreviewSidebar({ request }) {
  return (
    <aside className="flex flex-col gap-6 bg-warm px-7 py-10">
      <div>
        <Label className="mb-4">Live preview</Label>

        <div className="rounded-2xl border border-l-[3px] border-navy/10 border-l-peach bg-paper p-6">
          <CourseTag code={request.code || "CODE"} dark />
          <h3 className="mt-3 mb-3 text-[19px] leading-snug font-semibold">{request.title}</h3>

          <div className="flex flex-col gap-2 text-[13px] font-medium text-ink">
            <span className="flex items-center gap-2"><Diamond />{request.place}</span>
            <span className="flex items-center gap-2"><Diamond />{request.time}</span>
            <span className="flex items-center gap-2">
              <Diamond />
              {request.seatsLeft} {request.seatsLeft === 1 ? "seat" : "seats"} left · {request.style}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2.5 border-t border-navy/10 pt-4 text-[13px]">
            <div className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
              {request.owner.initials}
            </div>
            <span className="font-semibold">{request.owner.name}</span>
            <span className="text-xs font-medium text-muted">{request.owner.faculty}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-navy p-6">
        <Label onDark className="mb-3">How matching works</Label>
        <p className="text-[14px] leading-relaxed font-medium text-white/80">
          We compare subject, time overlap, course level and preferences — never grades. You always see the
          score before you accept anyone.
        </p>
      </div>
    </aside>
  );
}
