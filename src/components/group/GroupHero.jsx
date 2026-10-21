import Label from "../common/Label.jsx";

function statusText(group, status) {
  if (group.status === "CANCELLED") return "Cancelled by the owner";
  if (status === "ACCEPTED") return group.status === "FULL" ? "Group formed · you're in" : "You're in";
  if (status === "PENDING") return "Waiting for the owner";
  if (status === "REJECTED") return "Not accepted this time";
  return "Open group";
}

function calendarTime(date, time) {
  return date.replaceAll("-", "") + "T" + time.slice(0, 5).replace(":", "") + "00";
}

function downloadCalendar(group) {
  const now = new Date().toISOString().replaceAll("-", "").replaceAll(":", "").slice(0, 15) + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//StudyMate//EN",
    "BEGIN:VEVENT",
    "UID:studymate-group-" + group.id,
    "DTSTAMP:" + now,
    "DTSTART:" + calendarTime(group.meetingDate, group.startTime),
    "DTEND:" + calendarTime(group.meetingDate, group.endTime),
    "SUMMARY:" + group.courseCode + " study group",
    "LOCATION:" + group.place + (group.exactSpot ? ", " + group.exactSpot : ""),
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar" }));
  link.download = "study-group.ics";
  link.click();
}

export default function GroupHero({ group, status }) {
  return (
    <section className="bg-navy px-10 py-12 text-white">
      <div className="flex justify-between gap-6">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-[7px] bg-peach px-2.5 py-1 text-[10.5px] font-bold tracking-wider text-navy">
              {group.courseCode}
            </span>
            <Label onDark>{statusText(group, status)}</Label>
          </div>
          <h1 className="font-serif text-[44px] leading-tight">
            {group.subjectName} — {group.title}
          </h1>
          {group.description && <p className="mt-4 text-[15px] leading-relaxed text-white/75">{group.description}</p>}
        </div>

        {status === "ACCEPTED" && (
          <button
            onClick={() => downloadCalendar(group)}
            className="h-fit shrink-0 rounded-full border border-white/30 px-6 py-3 text-sm font-bold hover:bg-white/10"
          >
            Add to calendar
          </button>
        )}
      </div>
    </section>
  );
}
