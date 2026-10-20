export default function CourseTag({ code, dark }) {
  return (
    <span
      className={
        "inline-block rounded-[7px] px-2.5 py-1 text-[10.5px] font-bold tracking-wider " +
        (dark ? "bg-navy text-white" : "bg-warm text-navy")
      }
    >
      {code}
    </span>
  );
}
