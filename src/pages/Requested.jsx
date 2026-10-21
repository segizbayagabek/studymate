import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import RequestedTitle from "../components/requested/RequestedTitle.jsx";
import RequestedList from "../components/requested/RequestedList.jsx";
import { getGroup, getMyRequests, getUser } from "../api.js";

export default function Requested() {
  const user = getUser();
  const userId = user ? user.id : null;
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    getMyRequests(userId)
      .then((list) => {
        const active = list.filter((r) => r.status !== "CANCELLED");
        return Promise.all(active.map((r) => getGroup(userId, r.groupId).then((group) => ({ ...r, group: group }))));
      })
      .then(setRequests)
      .catch((e) => setError(e.message));
  }, [userId]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar active="/requested" />

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-8 py-10">
        <RequestedTitle requests={requests} />

        {error && <p className="text-[13px] font-semibold text-red-600">{error}</p>}

        <RequestedList requests={requests} />
      </main>
    </div>
  );
}
