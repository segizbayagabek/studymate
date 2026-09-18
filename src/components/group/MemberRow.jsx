import Avatar from "../ui/Avatar";
import Diamond from "../ui/Diamond";
import "./MemberRow.css";

export default function MemberRow({ member }) {
  return (
    <div className="sm-member">
      <Avatar initials={member.initials} size={40} tone={member.owner ? "navy" : "light"} />
      <div className="sm-member__who">
        <div className="sm-member__name">
          {member.name}
          {member.owner && <span className="sm-member__badge">Owner</span>}
        </div>
        <div className="sm-member__faculty">{member.faculty}</div>
      </div>
      <div className="sm-member__meta">
        <span className="sm-member__role">{member.role}</span>
        <span className="sm-member__rating">
          <Diamond size={7} />
          {member.rating}
        </span>
      </div>
    </div>
  );
}
