import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import SplitPage from "../components/layout/SplitPage";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import CourseTag from "../components/ui/CourseTag";
import Diamond from "../components/ui/Diamond";
import Field from "../components/ui/Field";
import Panel from "../components/ui/Panel";
import Stepper from "../components/ui/Stepper";
import Toggle from "../components/ui/Toggle";
import "./CreateRequest.css";

const PLACES = [
  { id: "library", name: "Library", note: "Quiet floors, group rooms" },
  { id: "canteen", name: "Canteen", note: "Talk freely, coffee nearby" },
  { id: "topfloor", name: "Top floor", note: "Study pods, whiteboards" },
];

const PREFERENCES = [
  "Quiet work",
  "Talkative",
  "Mixed group",
  "Women only",
  "Men only",
  "Same year",
  "Any level",
];

export default function CreateRequest() {
  const [place, setPlace] = useState("library");
  const [size, setSize] = useState(4);
  const [preference, setPreference] = useState("Quiet work");
  const [review, setReview] = useState(true);

  return (
    <AppLayout bleed>
      <SplitPage
        asideWidth={340}
        aside={
          <>
            <div className="sm-eyebrow">Live preview</div>
            <Panel accent className="sm-create__preview">
              <CourseTag>MATH 161</CourseTag>
              <h3 className="sm-create__previewTitle">Calculus II — practice set together</h3>
              <div className="sm-create__previewFacts">
                <span><Diamond size={6} />Library · 2nd floor</span>
                <span><Diamond size={6} />Today, 14:00 – 16:00</span>
                <span><Diamond size={6} />{size - 1} seats left · {preference.toLowerCase()}</span>
              </div>
              <div className="sm-create__previewOwner">
                <span className="sm-create__avatar">AT</span>
                <span className="sm-create__you">You</span>
                <span className="sm-create__year">· Year 2</span>
              </div>
            </Panel>
            <Panel tone="navy">
              <div className="sm-eyebrow sm-eyebrow--onNavy">How matching works</div>
              <p className="sm-create__matching">
                We compare subject, time overlap, course level and preferences — never grades. You
                always see the score before you accept anyone.
              </p>
            </Panel>
          </>
        }
      >
        <div className="sm-eyebrow">New request</div>
        <h2 className="sm-create__title">What are you studying, and where?</h2>

        <form className="sm-create__form" onSubmit={(e) => e.preventDefault()}>
          <div className="sm-create__pair">
            <Field label="Subject or course" caret>Calculus II</Field>
            <Field label="Course code">MATH 161</Field>
          </div>

          <Field
            label="What will you do together?"
            hint="Groups that say what they'll do fill twice as fast."
          >
            Work through the practice set, then explain solutions out loud to each other.
          </Field>

          <div>
            <span className="sm-create__label">Place on campus</span>
            <div className="sm-create__places">
              {PLACES.map((option) => {
                const active = place === option.id;
                return (
                  <button
                    type="button"
                    key={option.id}
                    className={`sm-create__place ${active ? "is-active" : ""}`}
                    onClick={() => setPlace(option.id)}
                    aria-pressed={active}
                  >
                    <span className="sm-create__placeTop">
                      <Diamond size={11} tone={active ? "peach" : "faded"} />
                      {active && <span className="sm-create__check">✓</span>}
                    </span>
                    <span className="sm-create__placeName">{option.name}</span>
                    <span className="sm-create__placeNote">{option.note}</span>
                  </button>
                );
              })}
            </div>
            <div className="sm-create__spot">
              <span className="sm-create__spotLabel">Exact spot</span>
              <span className="sm-create__spotValue">2nd floor, table 14</span>
              <span className="sm-create__spotNote">
                <Diamond size={7} />
                Shown to accepted members only
              </span>
            </div>
          </div>

          <div className="sm-create__triple">
            <Field label="Day" caret>Today, 16 Sep</Field>
            <Field label="Time" caret>14:00 – 16:00</Field>
            <label className="sm-field">
              <span className="sm-field__label">Group size</span>
              <Stepper value={size} onChange={setSize} />
            </label>
          </div>

          <div>
            <span className="sm-create__label">
              Preferences <span className="sm-create__optional">— optional, used for matching</span>
            </span>
            <div className="sm-create__prefs">
              {PREFERENCES.map((label) => (
                <Chip
                  as="button"
                  type="button"
                  key={label}
                  tone={preference === label ? "active" : "default"}
                  onClick={() => setPreference(label)}
                  className="sm-create__pref"
                >
                  {label}
                </Chip>
              ))}
            </div>
            <Toggle
              checked={review}
              onChange={setReview}
              label="Review each applicant before accepting"
              aside="Recommended"
            />
          </div>

          <div className="sm-create__actions">
            <Button variant="primary" size="lg">Post request</Button>
            <Button variant="secondary" size="lg" type="button">Save as draft</Button>
          </div>
        </form>
      </SplitPage>
    </AppLayout>
  );
}
