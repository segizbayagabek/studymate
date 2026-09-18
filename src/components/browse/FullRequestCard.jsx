import Button from "../ui/Button";
import CourseTag from "../ui/CourseTag";
import Panel from "../ui/Panel";
import "./FullRequestCard.css";

export default function FullRequestCard({ request }) {
  return (
    <Panel as="article" tone="warm" className="sm-full">
      <div>
        <div className="sm-full__tags">
          <CourseTag tone="muted">{request.code}</CourseTag>
          <span className="sm-full__state">Full</span>
        </div>
        <h3 className="sm-full__title">{request.title}</h3>
        <div className="sm-full__facts">
          {request.facts.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
        </div>
      </div>
      <Button variant="quiet">Notify me if a seat frees</Button>
    </Panel>
  );
}
