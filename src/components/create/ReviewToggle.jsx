export default function ReviewToggle({ on, setOn }) {
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className="flex w-full items-center gap-4 rounded-xl bg-warm px-5 py-4 text-left"
    >
      <span className={"flex h-8 w-14 shrink-0 items-center rounded-full p-1 " + (on ? "justify-end bg-navy" : "justify-start bg-navy/20")}>
        <span className={"size-6 rounded-full " + (on ? "bg-peach" : "bg-paper")}></span>
      </span>
      <span className="flex-1 text-[15px] font-semibold">Review each applicant before accepting</span>
      <span className="text-[13px] font-medium text-muted">Recommended</span>
    </button>
  );
}
