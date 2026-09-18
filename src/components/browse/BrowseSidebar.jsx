import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Diamond from "../ui/Diamond";
import Panel from "../ui/Panel";
import "./BrowseSidebar.css";

export default function BrowseSidebar({ sessionsJoined = 3, suggestions = [] }) {
  return (
    <>
      <Panel tone="navy" className="sm-week">
        <div className="sm-eyebrow sm-eyebrow--onNavy">Your week</div>
        <div className="sm-week__figure">
          <span className="sm-week__count">{sessionsJoined}</span>
          <span className="sm-week__unit">sessions joined</span>
        </div>
        <p className="sm-week__note">
          You taught twice this week. Teaching raises your helpfulness rating.
        </p>
      </Panel>

      <Panel className="sm-picked">
        <div className="sm-eyebrow">Picked for you</div>
        <div className="sm-picked__list">
          {suggestions.map((item) => (
            <div className="sm-picked__item" key={item.title}>
              <span className="sm-picked__icon"><Diamond size={10} /></span>
              <div>
                <div className="sm-picked__title">{item.title}</div>
                <div className="sm-picked__meta">{item.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel tone="dashed">
        <div className="sm-picked__prompt">Nothing fits your schedule?</div>
        <p className="sm-picked__meta sm-picked__promptNote">
          Post your own request — most groups fill within two hours.
        </p>
        <Button as={Link} to="/create" variant="peach" block>
          Create a study request
        </Button>
      </Panel>

      <div className="sm-serif-quote sm-sidebar__quote">“Docendo discimus.”</div>
    </>
  );
}
