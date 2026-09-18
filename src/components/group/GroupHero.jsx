import Button from "../ui/Button";
import CourseTag from "../ui/CourseTag";
import "./GroupHero.css";

export default function GroupHero({ group }) {
  return (
    <div className="sm-ghero">
      <div className="sm-ghero__text">
        <div className="sm-ghero__tags">
          <CourseTag tone="peach">{group.code}</CourseTag>
          <span className="sm-ghero__status">{group.status}</span>
        </div>
        <h2 className="sm-ghero__title">{group.title}</h2>
        <p className="sm-ghero__desc">{group.description}</p>
      </div>
      <div className="sm-ghero__actions">
        <Button variant="peach">Open group chat</Button>
        <Button variant="ghostOnNavy">Add to calendar</Button>
      </div>
    </div>
  );
}
