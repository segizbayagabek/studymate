import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import GroupHero from "../components/group/GroupHero.jsx";
import GroupFacts from "../components/group/GroupFacts.jsx";
import PrivacyNote from "../components/group/PrivacyNote.jsx";
import MemberList from "../components/group/MemberList.jsx";
import GroupSidebar from "../components/group/GroupSidebar.jsx";
import { cancelRequest, getGroup, getMyRequests, getUser, joinGroup } from "../api.js";

export default function GroupDetail() {
  const user = getUser();
  const userId = user ? user.id : null;
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [myRequest, setMyRequest] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    getGroup(userId, groupId).then(setGroup).catch((e) => setError(e.message));
    getMyRequests(userId)
      .then((requests) => {
        const found = requests.find((r) => r.groupId === Number(groupId) && r.status !== "CANCELLED");
        setMyRequest(found || null);
      })
      .catch((e) => setError(e.message));
  }, [userId, groupId, reloadCount]);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (group && group.organizer.id === user.id) {
    return <Navigate to={"/groups/" + group.id + "/applicants"} />;
  }

  function reload(action) {
    setError("");
    action.then(() => setReloadCount(reloadCount + 1)).catch((e) => setError(e.message));
  }

  const status = myRequest ? myRequest.status : null;

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar active="/requested" />

      {error && <p className="px-10 pt-6 text-[13px] font-semibold text-red-600">{error}</p>}

      {group && (
        <>
          <GroupHero group={group} status={status} />

          <div className="grid flex-1 grid-cols-[1fr_380px]">
            <main className="flex flex-col gap-7 border-r border-navy/10 px-10 py-10">
              <GroupFacts group={group} />
              <PrivacyNote accepted={status === "ACCEPTED"} />
              <MemberList group={group} user={user} accepted={status === "ACCEPTED"} />
            </main>

            <GroupSidebar
              group={group}
              myRequest={myRequest}
              onJoin={() => reload(joinGroup(userId, group))}
              onCancel={() => reload(cancelRequest(userId, myRequest.id))}
            />
          </div>
        </>
      )}
    </div>
  );
}
