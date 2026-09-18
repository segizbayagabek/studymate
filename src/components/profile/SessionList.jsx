import Diamond from "../ui/Diamond";
import "./SessionList.css";

export default function SessionList({ sessions }) {
  return (
    <div className="sm-sessions">
      {sessions.map((session) => (
        <div className="sm-sessions__row" key={session.title}>
          <Diamond size={9} />
          <span className="sm-sessions__title">{session.title}</span>
          <span className="sm-sessions__meta">{session.meta}</span>
          <span className={`sm-sessions__role ${session.taught ? "is-taught" : ""}`}>
            {session.role}
          </span>
        </div>
      ))}
    </div>
  );
}
