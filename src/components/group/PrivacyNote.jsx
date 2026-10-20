import Diamond from "../ui/Diamond";
import "./PrivacyNote.css";

export default function PrivacyNote({ children, aside }) {
  return (
    <div className="sm-privacy">
      <Diamond size={10} />
      <div className="sm-privacy__text">{children}</div>
      {aside && <span className="sm-privacy__aside">{aside}</span>}
    </div>
  );
}
