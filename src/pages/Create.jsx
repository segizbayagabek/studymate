import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import CreateTitle from "../components/create/CreateTitle.jsx";
import SubjectFields from "../components/create/SubjectFields.jsx";
import DescriptionField from "../components/create/DescriptionField.jsx";
import PlacePicker from "../components/create/PlacePicker.jsx";
import WhenFields from "../components/create/WhenFields.jsx";
import PreferenceChips from "../components/create/PreferenceChips.jsx";
import FieldLabel from "../components/create/FieldLabel.jsx";
import Select from "../components/create/Select.jsx";
import PreviewSidebar from "../components/create/PreviewSidebar.jsx";
import { createGroup, dayLabel, getUser, initialsOf, timeRange, toEnum } from "../api.js";

const places = [
  { name: "Library", note: "Quiet floors, group rooms" },
  { name: "Canteen", note: "Talk freely, coffee nearby" },
  { name: "Top floor", note: "Study pods, whiteboards" },
];

const levels = ["Beginner", "Intermediate", "Advanced"];

const preferences = ["Quiet work", "Talkative", "Mixed group", "Women only", "Men only", "Same year", "Any level"];

function todayDate() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

export default function Create() {
  const user = getUser();
  const me = user
    ? { initials: initialsOf(user.name), name: user.name, faculty: "SDU University" }
    : { initials: "", name: "", faculty: "" };

  const [subject, setSubject] = useState("");
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState(places[0].name);
  const [exactSpot, setExactSpot] = useState("");
  const [meetingDate, setMeetingDate] = useState(todayDate());
  const [startTime, setStartTime] = useState("14:00");
  const [endTime, setEndTime] = useState("16:00");
  const [groupSize, setGroupSize] = useState(4);
  const [level, setLevel] = useState(levels[1]);
  const [chosenPreferences, setChosenPreferences] = useState(["Quiet work"]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const request = {
    code: code,
    title: (subject || "Subject") + " — " + (title || "your title here"),
    description: description,
    place: place,
    exactSpot: exactSpot,
    time: meetingDate && startTime && endTime ? dayLabel(meetingDate) + ", " + timeRange(startTime, endTime) : "Pick a day and time",
    style: chosenPreferences.length > 0 ? chosenPreferences.join(" · ") : "No preferences",
    seatsLeft: groupSize - 1,
    groupSize: groupSize,
    owner: me,
    highlight: true,
    mine: true,
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (subject.trim() === "" || code.trim() === "" || title.trim() === "" || description.trim() === "") {
      setError("Please fill in the subject, course code, a short title and what you'll do together.");
      return;
    }

    if (meetingDate === "" || meetingDate < todayDate()) {
      setError("Please pick today or a later day.");
      return;
    }

    if (startTime === "" || endTime === "" || endTime <= startTime) {
      setError("The meeting has to end after it starts.");
      return;
    }

    createGroup(user.id, {
      title: title.trim(),
      description: description.trim(),
      subjectName: subject.trim(),
      courseCode: code.trim(),
      place: toEnum(place),
      exactSpot: exactSpot.trim(),
      meetingDate: meetingDate,
      startTime: startTime,
      endTime: endTime,
      level: toEnum(level),
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
              minDate={todayDate()}
              meetingDate={meetingDate}
              setMeetingDate={setMeetingDate}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              groupSize={groupSize}
              setGroupSize={setGroupSize}
            />

            <label className="block max-w-xs">
              <FieldLabel>Your level in this subject</FieldLabel>
              <Select value={level} onChange={setLevel} options={levels} />
            </label>

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
