import Diamond from "../common/Diamond.jsx";

export default function FilterBar() {
  return (
    <div className="mb-6 flex flex-wrap gap-2 rounded-2xl bg-warm p-3.5 text-[12.5px] font-semibold">
      <FilterButton name="Subject" value="All" />
      <FilterButton name="Place" value="Any" />
      <FilterButton name="Time" value="Afternoon" />
      <div className="flex items-center gap-2 rounded-full bg-navy px-3.5 py-2 text-white">
        <Diamond />
        Matches me first
      </div>
      <div className="flex-1"></div>
      <input
        placeholder="Search subject or course code"
        className="w-60 rounded-full border border-navy/10 bg-paper px-4 py-2 font-medium outline-none placeholder:text-muted"
      />
    </div>
  );
}

function FilterButton({ name, value }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-navy/10 bg-paper px-3.5 py-2">
      {name} <span className="text-muted">{value}</span> <span className="text-peach-dark">▾</span>
    </div>
  );
}
