import "./StatGrid.css";

export default function StatGrid({ stats }) {
  return (
    <div className="sm-stats">
      {stats.map((stat) => (
        <div className="sm-stats__item" key={stat.label}>
          <div className="sm-stats__value">{stat.value}</div>
          <div className="sm-stats__label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
