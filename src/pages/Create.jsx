import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import CreateTitle from "../components/create/CreateTitle.jsx";
import SubjectFields from "../components/create/SubjectFields.jsx";
import DescriptionField from "../components/create/DescriptionField.jsx";
import PlacePicker from "../components/create/PlacePicker.jsx";
import WhenFields from "../components/create/WhenFields.jsx";
import PreferenceChips from "../components/create/PreferenceChips.jsx";
import PreviewSidebar from "../components/create/PreviewSidebar.jsx";
import { createGroup, getUser, initialsOf, toEnum } from "../api.js";

const subjects = [
  { name: "Calculus II", code: "MATH 161" },
  { name: "Discrete Math", code: "MATH 151" },
  { name: "Data Structures", code: "CS 204" },
  { name: "Mechanics", code: "PHYS 121" },
  { name: "Academic English", code: "ENG 102" },
  { name: "Kazakh History", code: "HIST 101" },
];

const places = [
  { name: "Library", note: "Quiet floors, group rooms" },
  { name: "Canteen", note: "Talk freely, coffee nearby" },
  { name: "Top floor", note: "Study pods, whiteboards" },
];

const days = ["Today", "Tomorrow", "Day after tomorrow"];

const times = ["09:00 – 11:00", "11:00 – 13:00", "14:00 – 16:00", "16:00 – 18:00", "18:00 – 20:00"];

const preferences = ["Quiet work", "Talkative", "Mixed group", "Women only", "Men only", "Same year", "Any level"];

function dateInDays(daysFromToday) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

export default function Create() {
  const user = getUser();
  const me = user
    ? { initials: initialsOf(user.name), name: user.name, faculty: "SDU University" }
    : { initials: "", name: "", faculty: "" };

  // One piece of state for every field in the form
  const [subject, setSubject] = useState(subjects[0].name);
  const [code, setCode] = useState(subjects[0].code);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState(places[0].name);
  const [exactSpot, setExactSpot] = useState("");
  const [day, setDay] = useState(days[0]);
  const [time, setTime] = useState(times[2]);
  const [groupSize, setGroupSize] = useState(4);
  const [chosenPreferences, setChosenPreferences] = useState(["Quiet work"]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // The live preview on the right uses this, so it updates as you type.
  const request = {
    code: code,
    title: subject + " — " + (title || "your title here"),
    description: description,
    place: place,
    exactSpot: exactSpot, // only for accepted members, not shown on Browse
    time: day + ", " + time,
    style: chosenPreferences.length > 0 ? chosenPreferences.join(" · ") : "No preferences",
    seatsLeft: groupSize - 1, // you already take one seat
    groupSize: groupSize,
    owner: me,
    highlight: true,
    mine: true,
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (code.trim() === "" || title.trim() === "" || description.trim() === "") {
      setError("Please fill in the course code, a short title and what you'll do together.");
      return;
    }

    const [startTime, endTime] = time.split(" – ");

    createGroup(user.id, {
      title: title.trim(),
      description: description.trim(),
      subjectName: subject,
      courseCode: code.trim(),
      place: toEnum(place),
      exactSpot: exactSpot.trim(),
      meetingDate: dateInDays(days.indexOf(day)),
      startTime: startTime,
      endTime: endTime,
      preferences: chosenPreferences.map(toEnum),
      groupSize: groupSize,
    })
      .then(() => navigate("/browse"))
      .catch((e) => setError(e.message));
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar active="/create" />

      <div className="grid flex-1 grid-cols-[1fr_380px]">
        <main className="border-r border-navy/10 px-10 py-10">
          <form onSubmit={handleSubmit} className="flex max-w-4xl flex-col gap-7">
            <CreateTitle />

            <SubjectFields
              subjects={subjects}
              subject={subject}
              setSubject={setSubject}
              code={code}
              setCode={setCode}
              title={title}
              setTitle={setTitle}
            />

            <DescriptionField description={description} setDescription={setDescription} />

            <PlacePicker
              places={places}
              place={place}
              setPlace={setPlace}
              exactSpot={exactSpot}
              setExactSpot={setExactSpot}
            />

            <WhenFields
              days={days}
              day={day}
              setDay={setDay}
              times={times}
              time={time}
              setTime={setTime}
              groupSize={groupSize}
              setGroupSize={setGroupSize}
            />

            <PreferenceChips
              preferences={preferences}
              chosen={chosenPreferences}
              setChosen={setChosenPreferences}
            />

            {error && <p className="text-[13px] font-semibold text-red-600">{error}</p>}

            <button type="submit" className="w-fit rounded-full bg-navy px-10 py-4 text-sm font-bold text-white hover:bg-navy-dark">
              Post request
            </button>
          </form>
        </main>

        <PreviewSidebar request={request} />
      </div>
    </div>
  );
}
