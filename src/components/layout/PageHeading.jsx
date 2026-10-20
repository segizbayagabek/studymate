import "./PageHeading.css";

export default function PageHeading({ eyebrow, title, sub, actions }) {
  return (
    <div className="sm-heading">
      <div className="sm-heading__text">
        {eyebrow && <div className="sm-eyebrow sm-heading__eyebrow">{eyebrow}</div>}
        <h2 className="sm-heading__title">{title}</h2>
        {sub && <p className="sm-heading__sub">{sub}</p>}
      </div>
      {actions && <div className="sm-heading__actions">{actions}</div>}
    </div>
  );
}
