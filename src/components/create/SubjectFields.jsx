import FieldLabel from "./FieldLabel.jsx";
import Select from "./Select.jsx";

export default function SubjectFields({ subjects, subject, setSubject, code, setCode, title, setTitle }) {
  function handleSubjectChange(newSubject) {
    setSubject(newSubject);
    const found = subjects.find((s) => s.name === newSubject);
    setCode(found.code);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-[1.3fr_1fr] gap-5">
        <label>
          <FieldLabel>Subject or course</FieldLabel>
          <Select
            value={subject}
            onChange={handleSubjectChange}
            options={subjects.map((s) => s.name)}
          />
        </label>

        <label>
          <FieldLabel>Course code</FieldLabel>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-xl border border-navy/10 bg-warm px-4 py-3.5 text-[15px] font-medium outline-none focus:border-navy/40"
          />
        </label>
      </div>

      <label>
        <FieldLabel>Short title</FieldLabel>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. practice set together"
          className="w-full rounded-xl border border-navy/10 bg-warm px-4 py-3.5 text-[15px] font-medium outline-none placeholder:text-muted/60 focus:border-navy/40"
        />
      </label>
    </div>
  );
}
