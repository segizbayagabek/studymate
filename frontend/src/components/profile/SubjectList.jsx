import { useState } from "react";
import Label from "../common/Label.jsx";
import { subjects as allSubjects } from "../../data/subjects.js";
import { fromEnum } from "../../api.js";
import { t } from "../../i18n.js";

const levels = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

// subjects = [{ subjectName, courseCode, level }]. onSave gets the new list.
export default function SubjectList({ subjects, onSave }) {
  const [adding, setAdding] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newLevel, setNewLevel] = useState("INTERMEDIATE");

  // Subjects that are not on the profile yet
  const notAdded = allSubjects.filter((subject) => !subjects.some((mine) => mine.courseCode === subject.code));

  function startAdding() {
    setNewSubject(notAdded[0].name);
    setNewLevel("INTERMEDIATE");
    setAdding(true);
  }

  function add() {
    const found = allSubjects.find((subject) => subject.name === newSubject);
    onSave([...subjects, { subjectName: found.name, courseCode: found.code, level: newLevel }]);
    setAdding(false);
  }

  function remove(subject) {
    onSave(subjects.filter((s) => s.courseCode !== subject.courseCode));
  }

  return (
    <section>
      <Label className="mb-4">{t("profile.subjects")}</Label>

      {subjects.length === 0 && !adding && (
        <p className="mb-4 text-[14px] font-medium text-muted">{t("profile.noSubjects")}</p>
      )}

      <div className="flex flex-wrap items-center gap-2.5">
        {subjects.map((subject, index) => (
          <span
            key={subject.courseCode}
            className={
              "flex items-center gap-2 rounded-full py-2.5 pr-3 pl-5 text-[14px] font-semibold " +
              (index === 0 ? "bg-navy text-white" : "border border-navy/10 bg-warm text-ink")
            }
          >
            {subject.subjectName}
            <span className="font-medium opacity-60">· {fromEnum(subject.level)}</span>
            <button
              onClick={() => remove(subject)}
              title={t("profile.removeSubject", { subject: subject.subjectName })}
              className="flex size-5 items-center justify-center rounded-full text-[15px] leading-none opacity-60 hover:opacity-100"
            >
              ×
            </button>
          </span>
        ))}

        {!adding && notAdded.length > 0 && (
          <button
            onClick={startAdding}
            className="rounded-full border border-dashed border-peach-dark/50 px-5 py-2.5 text-[14px] font-semibold text-peach-dark hover:bg-peach-light/40"
          >
            {t("profile.addSubject")}
          </button>
        )}
      </div>

      {adding && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-navy/10 bg-warm p-4 text-[14px] font-medium">
          <select
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="rounded-xl border border-navy/10 bg-paper px-4 py-2.5 outline-none"
          >
            {notAdded.map((subject) => (
              <option key={subject.code} value={subject.name}>
                {subject.name} ({subject.code})
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            {t("profile.level")}
            <select
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
              className="rounded-xl border border-navy/10 bg-paper px-4 py-2.5 outline-none"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {fromEnum(level)}
                </option>
              ))}
            </select>
          </label>

          <button onClick={add} className="rounded-full bg-navy px-5 py-2.5 text-[13px] font-bold text-white hover:bg-navy-dark">
            {t("profile.add")}
          </button>
          <button
            onClick={() => setAdding(false)}
            className="rounded-full border border-navy/20 px-5 py-2.5 text-[13px] font-semibold hover:bg-paper"
          >
            {t("common.cancel")}
          </button>
        </div>
      )}
    </section>
  );
}
