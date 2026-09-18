import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import CourseTag from "../ui/CourseTag";
import Diamond from "../ui/Diamond";
import Panel from "../ui/Panel";
import "./RequestCard.css";

function Seats({ left, size }) {
  return (
    <div className="sm-seats">
      <div className="sm-seats__count">{left}</div>
      <div className="sm-seats__label">{left === 1 ? "Seat left" : "Seats left"}</div>
      <div className="sm-seats__dots">
        {Array.from({ length: size }).map((_, i) => (
          <span key={i} className={i < size - left ? "is-taken" : ""} />
        ))}
      </div>
    </div>
  );
}

export default function RequestCard({ request, onJoin }) {
  const { code, match, featured, title, description, facts, seatsLeft, size, owner } = request;

  return (
    <Panel as="article" accent={featured} raised={featured} className="sm-request">
      <div className="sm-request__top">
        <div className="sm-request__body">
          <div className="sm-request__tags">
            <CourseTag tone={featured ? "navy" : "warm"}>{code}</CourseTag>
            <span className={`sm-request__match ${featured ? "is-high" : ""}`}>{match}% match</span>
          </div>
          <h3 className="sm-request__title">{title}</h3>
          <p className="sm-request__desc">{description}</p>
          <div className="sm-request__facts">
            {facts.map((fact) => (
              <span className="sm-request__fact" key={fact}>
                <Diamond size={7} />
                {fact}
              </span>
            ))}
          </div>
        </div>
        <div className="sm-request__side">
          <Seats left={seatsLeft} size={size} />
          <Button
            variant={featured ? "primary" : "secondary"}
            block
            onClick={() => onJoin?.(request)}
          >
            Request to join
          </Button>
        </div>
      </div>

      <div className="sm-request__owner">
        <Avatar initials={owner.initials} size={30} tone="light" />
        <Link to="/profile" className="sm-request__name">{owner.name}</Link>
        <span className="sm-request__faculty">{owner.faculty}</span>
        <span className="sm-request__rating">
          <Diamond size={7} />
          {owner.rating} social rating
        </span>
      </div>
    </Panel>
  );
}
