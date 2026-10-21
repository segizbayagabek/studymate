import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import BrowseTitle from "../components/browse/BrowseTitle.jsx";
import FilterBar from "../components/browse/FilterBar.jsx";
import RequestCard from "../components/browse/RequestCard.jsx";
import FullGroupCard from "../components/browse/FullGroupCard.jsx";
import Sidebar from "../components/browse/Sidebar.jsx";
import { fromEnum, getGroups, getMyRequests, getUser, initialsOf, joinGroup, whenText } from "../api.js";

function partOfDay(time) {
  const hour = Number(time.slice(0, 2));
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

function matchesFilters(group, filters) {
  const search = filters.search.trim().toLowerCase();
  const text = (group.subjectName + " " + group.courseCode + " " + group.title).toLowerCase();

  return (
    (filters.subject === "All" || group.subjectName === filters.subject) &&
    (filters.place === "Any" || fromEnum(group.place) === filters.place) &&
    (filters.time === "Any" || partOfDay(group.startTime) === filters.time) &&
    (search === "" || text.includes(search))
  );
}

function toCard(group, user, sentGroupIds) {
  return {
    id: group.id,
    code: group.courseCode,
    level: fromEnum(group.level).toUpperCase(),
    title: group.subjectName + " — " + group.title,
    description: group.description,
    place: fromEnum(group.place),
    time: whenText(group),
    style: group.preferences.length > 0 ? group.preferences.map(fromEnum).join(" · ") : "No preferences",
    seatsLeft: group.seatsLeft,
    groupSize: group.groupSize,
    owner: { initials: initialsOf(group.organizer.name), name: group.organizer.name, faculty: "SDU University" },
    highlight: group.organizer.id === user.id,
    mine: group.organizer.id === user.id,
    sent: sentGroupIds.includes(group.id),
    group: group,
  };
}

export default function Browse() {
  const user = getUser();
  const userId = user ? user.id : null;
  const [groups, setGroups] = useState([]);
  const [sentGroupIds, setSentGroupIds] = useState([]);
  const [filters, setFilters] = useState({ subject: "All", place: "Any", time: "Any", search: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    getGroups().then(setGroups).catch((e) => setError(e.message));
    getMyRequests(userId)
      .then((requests) => setSentGroupIds(requests.filter((r) => r.status !== "CANCELLED").map((r) => r.groupId)))
      .catch((e) => setError(e.message));
  }, [userId]);

  if (!user) {
    return <Navigate to="/" />;
  }

  function handleJoin(group) {
    joinGroup(user.id, group)
      .then(() => setSentGroupIds([...sentGroupIds, group.id]))
      .catch((e) => setError(e.message));
  }

  const subjects = [...new Set(groups.map((group) => group.subjectName))];
  const cards = groups
    .filter((group) => matchesFilters(group, filters))
    .map((group) => toCard(group, user, sentGroupIds));

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar active="/browse" />

      <div className="grid flex-1 grid-cols-[1fr_316px]">
        <main className="border-r border-navy/10 p-8">
          <BrowseTitle count={cards.length} />
          <FilterBar subjects={subjects} filters={filters} setFilters={setFilters} />

          {error && <p className="mb-4 text-[13px] font-semibold text-red-600">{error}</p>}

          <div className="flex flex-col gap-3.5">
            {cards.length === 0 && (
              <p className="rounded-2xl border border-dashed border-navy/20 p-6 text-sm font-medium text-muted">
                {groups.length === 0 ? "No open groups right now." : "No groups match these filters."}
              </p>
            )}
            {cards.map((card) => (
              <RequestCard key={card.id} request={card} onJoin={() => handleJoin(card.group)} />
            ))}
            <FullGroupCard />
          </div>
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
