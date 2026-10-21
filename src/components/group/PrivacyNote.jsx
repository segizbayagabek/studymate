import Diamond from "../common/Diamond.jsx";

export default function PrivacyNote({ accepted }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-peach px-6 py-4">
      <Diamond className="size-2.5" />
      <span className="flex-1 text-[15px] font-semibold">
        {accepted
          ? "The exact spot is visible because you were accepted."
          : "The exact spot is shared only with accepted members."}
      </span>
      <span className="text-[13px] font-medium text-muted">Hidden from the public feed</span>
    </div>
  );
}
