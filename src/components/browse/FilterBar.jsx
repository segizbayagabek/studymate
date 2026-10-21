import Diamond from "../common/Diamond.jsx";

const places = ["Any", "Library", "Canteen", "Top floor"];

const times = ["Any", "Morning", "Afternoon", "Evening"];

export default function FilterBar({ subjects, filters, setFilters }) {
  function change(name, value) {
    setFilters({ ...filters, [name]: value });
  }

  return (
    <div className="mb-6 flex flex-wrap gap-2 rounded-2xl bg-warm p-3.5 text-[12.5px] font-semibold">
      <FilterSelect name="Subject" value={filters.subject} options={["All", ...subjects]} onChange={(value) => change("subject", value)} />
      <FilterSelect name="Place" value={filters.place} options={places} onChange={(value) => change("place", value)} />
      <FilterSelect name="Time" value={filters.time} options={times} onChange={(value) => change("time", value)} />
      <div className="flex items-center gap-2 rounded-full bg-navy px-3.5 py-2 text-white">
        <Diamond />
        Matches me first
      </div>
      <div className="flex-1"></div>
      <input
        value={filters.search}
        onChange={(e) => change("search", e.target.value)}
        placeholder="Search subject or course code"
        className="w-60 rounded-full border border-navy/10 bg-paper px-4 py-2 font-medium outline-none placeholder:text-muted"
      />
    </div>
  );
}

function FilterSelect({ name, value, options, onChange }) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-navy/10 bg-paper py-2 pr-2.5 pl-3.5">
      {name}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer bg-transparent text-muted outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
