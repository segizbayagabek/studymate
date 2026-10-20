
export default function FullGroupCard() {
  return (
    <article className="flex items-center justify-between gap-5 rounded-[18px] border border-navy/10 bg-warm px-6 py-5 opacity-80">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-[7px] bg-navy/10 px-2.5 py-1 text-[10.5px] font-bold tracking-wider">PHYS 121</span>
          <span className="text-[10px] font-bold tracking-[0.14em] text-muted">FULL</span>
        </div>
        <h3 className="mb-2 text-[19px] font-semibold">Mechanics problem set — Chapter 6 & 7</h3>
        <div className="flex gap-4 text-[12.5px] font-semibold text-muted">
          <span>Library · group room B</span>
          <span>Today, 19:00 – 20:30</span>
          <span>4 of 4 joined</span>
        </div>
      </div>
      <button className="rounded-full border border-navy/20 px-5 py-3 text-[13px] font-bold text-muted">
        Notify me if a seat frees
      </button>
    </article>
  );
}
