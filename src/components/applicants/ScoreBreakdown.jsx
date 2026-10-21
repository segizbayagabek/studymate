export default function ScoreBreakdown({ breakdown, hint }) {
  const rows = [
    { label: "Subject", value: breakdown.subject },
    { label: "Time", value: breakdown.time },
    { label: "Level", value: breakdown.level },
    { label: "Preferences", value: breakdown.preferences, accent: true },
  ];

  return (
    <div>
      <div className="mb-3 text-[10px] font-bold tracking-[0.18em] text-muted">SCORE BREAKDOWN</div>

      <div className="flex flex-col gap-2.5">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[88px_1fr_32px] items-center gap-3 text-[13.5px] font-medium">
            <span>{row.label}</span>
            <div className="h-1.5 rounded-full bg-warm">
              <div
                className={"h-full rounded-full " + (row.accent ? "bg-peach" : "bg-navy")}
                style={{ width: row.value + "%" }}
              ></div>
            </div>
            <span className="text-right font-bold">{row.value}</span>
          </div>
        ))}
      </div>

      {hint && <p className="mt-3 text-xs font-medium text-muted">{hint}</p>}
    </div>
  );
}
