import "./FactGrid.css";

/** The three warm "When / Where / Group" tiles. */
export default function FactGrid({ facts }) {
  return (
    <div className="sm-facts">
      {facts.map((fact) => (
        <div className="sm-facts__item" key={fact.label}>
          <div className="sm-eyebrow sm-eyebrow--muted sm-facts__label">{fact.label}</div>
          <div className="sm-facts__value">
            {fact.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            {fact.muted && <span className="sm-facts__muted">{fact.muted}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
