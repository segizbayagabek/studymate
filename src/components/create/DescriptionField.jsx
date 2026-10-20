import FieldLabel from "./FieldLabel.jsx";

export default function DescriptionField({ description, setDescription }) {
  return (
    <label>
      <FieldLabel>What will you do together?</FieldLabel>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        placeholder="Work through the practice set, then explain solutions out loud to each other."
        className="w-full resize-none rounded-xl border border-navy/10 bg-warm px-4 py-3.5 text-[15px] font-medium outline-none placeholder:text-muted/60 focus:border-navy/40"
      />
      <span className="mt-2 block text-xs font-medium text-muted">
        Groups that say what they'll do fill twice as fast.
      </span>
    </label>
  );
}
