import { NavLink } from "react-router-dom";
import { navItems, languages } from "../../data/navigation";
import { getUser, initialsOf } from "../../api.js";
import { useI18n } from "../../i18n.js";
import Avatar from "../ui/Avatar";
import crest from "../../assets/sdu-crest.png";
import "./AppHeader.css";

export default function AppHeader({ user = { initials: "AT" } }) {
  const { lang, setLang, t } = useI18n();
  const savedUser = getUser();
  const initials = savedUser && savedUser.name ? initialsOf(savedUser.name) : user.initials;

  return (
    <header className="sm-header">
      <div className="sm-header__brand">
        <img className="sm-header__crest" src={crest} alt="SDU University" />
        <span className="sm-header__rule" />
        <span className="sm-header__word">Study Mate</span>
      </div>

      <nav className="sm-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sm-nav__link ${isActive ? "is-active" : ""}`}
          >
            {t(item.label)}
          </NavLink>
        ))}
      </nav>

      <div className="sm-header__right">
        <div className="sm-lang" role="group" aria-label="Language">
          {languages.map((code) => (
            <button
              key={code}
              type="button"
              className={`sm-lang__btn ${lang === code ? "is-active" : ""}`}
              onClick={() => setLang(code)}
            >
              {code}
            </button>
          ))}
        </div>
        <Avatar initials={initials} size={34} />
      </div>
    </header>
  );
}
