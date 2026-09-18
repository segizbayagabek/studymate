import Diamond from "../ui/Diamond";
import "./FilterBar.css";

export default function FilterBar({ filters, matchFirst = true, onToggleMatchFirst }) {
  return (
    <div className="sm-filters">
      <div className="sm-filters__strip">
        {filters.map((filter) => (
          <button type="button" className="sm-filters__chip" key={filter.label}>
            {filter.label} <span className="sm-filters__value">{filter.value}</span>
            <span className="sm-filters__caret">▾</span>
          </button>
        ))}
        <button
          type="button"
          className={`sm-filters__chip sm-filters__chip--active ${matchFirst ? "is-on" : ""}`}
          onClick={onToggleMatchFirst}
        >
          <Diamond size={7} />
          Matches me first
        </button>
      </div>
      <label className="sm-filters__search">
        <span className="sm-sr-only">Search subject or course code</span>
        <input type="search" placeholder="Search subject or course code" />
      </label>
    </div>
  );
}
