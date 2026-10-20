import Button from "../ui/Button";
import Panel from "../ui/Panel";
import "./GroupSidebar.css";

export default function GroupSidebar({ group }) {
  return (
    <>
      <Panel className="sm-gs__map">
        <div className="sm-gs__mapImage">campus map · library wing</div>
        <div className="sm-gs__mapBody">
          <div className="sm-eyebrow sm-eyebrow--muted">Meeting point</div>
          <div className="sm-gs__mapText">{group.meetingPoint}</div>
        </div>
      </Panel>

      <Panel>
        <div className="sm-eyebrow">Agenda</div>
        <div className="sm-gs__agenda">
          {group.agenda.map((row) => (
            <div className="sm-gs__agendaRow" key={row.time}>
              <span className="sm-gs__time">{row.time}</span>
              <span>{row.text}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel tone="navy">
        <div className="sm-eyebrow sm-eyebrow--onNavy">After the session</div>
        <p className="sm-gs__after">
          You'll be asked whether everyone showed up and was respectful. This is what builds social
          rating.
        </p>
        <Button variant="ghostOnNavy" block>Leave group</Button>
      </Panel>
    </>
  );
}
