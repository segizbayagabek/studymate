import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Diamond from "../components/ui/Diamond";
import logo from "../assets/sdu-logo.png";
import campus from "../assets/sdu-campus.png";
import "./SignIn.css";

export default function SignIn() {
  return (
    <div className="sm-shell">
      <div className="sm-screen sm-signin">
        <div className="sm-signin__brandside">
          <div className="sm-signin__lockup">
            <div className="sm-signin__logoBox">
              <img src={logo} alt="SDU University" />
            </div>
            <div>
              <div className="sm-signin__wordmark">Study Mate</div>
              <div className="sm-signin__by">By SDU University</div>
            </div>
          </div>

          <div>
            <p className="sm-signin__pitch">Find someone to study with, on campus, today.</p>
            <div className="sm-signin__quote">
              <Diamond size={9} style={{ marginTop: 7 }} />
              <p>“Docendo discimus.” By teaching, we learn. — Seneca</p>
            </div>
          </div>

          <div className="sm-signin__photo">
            <img src={campus} alt="SDU campus" />
          </div>
        </div>

        <form className="sm-signin__form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <div className="sm-eyebrow">Student access</div>
            <h2 className="sm-signin__title">Welcome back</h2>
            <p className="sm-signin__sub">
              Use your university account. Study Mate is open to SDU students only.
            </p>
          </div>

          <div className="sm-signin__fields">
            <label className="sm-signin__field">
              <span className="sm-signin__label">SDU email</span>
              <span className="sm-signin__input">
                <input type="text" defaultValue="aliya.tursyn" aria-label="SDU email" />
                <span className="sm-signin__domain">@sdu.edu.kz</span>
              </span>
            </label>

            <label className="sm-signin__field">
              <span className="sm-signin__label">Password</span>
              <span className="sm-signin__input">
                <input type="password" defaultValue="password" aria-label="Password" />
              </span>
            </label>

            <div className="sm-signin__row">
              <label className="sm-signin__keep">
                <input type="checkbox" defaultChecked />
                Keep me signed in
              </label>
              <a href="#forgot">Forgot password?</a>
            </div>
          </div>

          <div className="sm-signin__actions">
            <Button as={Link} to="/browse" variant="primary" size="lg" block>
              Log in with SDU account
            </Button>
            <Button variant="secondary" size="lg" block type="button">
              Create an account
            </Button>
          </div>

          <p className="sm-signin__legal">
            Provided by SDU University · Student Affairs. By continuing you accept the campus
            community rules.
          </p>
        </form>
      </div>
    </div>
  );
}
