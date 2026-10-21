import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import Diamond from "../components/common/Diamond.jsx";
import ApplicantsTitle from "../components/applicants/ApplicantsTitle.jsx";
import ApplicantCard from "../components/applicants/ApplicantCard.jsx";
import LowMatchRow from "../components/applicants/LowMatchRow.jsx";
import GroupMembers from "../components/applicants/GroupMembers.jsx";
import { acceptRequest, declineRequest, getApplicants, getGroup, getUser } from "../api.js";

export default function Applicants() {
  const user = getUser();
  const userId = user ? user.id : null;
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [sort, setSort] = useState("compatibility");
  const [showLow, setShowLow] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    getGroup(userId, groupId).then(setGroup).catch((e) => setError(e.message));
    getApplicants(userId, groupId).then(setApplicants).catch((e) => setError(e.message));
  }, [userId, groupId, reloadCount]);

  if (!user) {
    return <Navigate to="/" />;
  }

  function decide(action, applicant) {
    setError("");
    action(userId, applicant.id)
      .then(() => setReloadCount(reloadCount + 1))
      .catch((e) => setError(e.message));
  }

  const pending = applicants.filter((a) => a.status === "PENDING");
  const sorted = sort === "newest" ? [...pending].sort((a, b) => b.createdAt.localeCompare(a.createdAt)) : pending;
  const goodMatches = sorted.filter((a) => a.score >= 70);
  const lowMatches = sorted.filter((a) => a.score >= 60 && a.score < 70);
  const hiddenMatches = sorted.filter((a) => a.score < 60);
  const members = applicants.filter((a) => a.status === "ACCEPTED");

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar active="/groups" />

      {error && <p className="px-10 pt-6 text-[13px] font-semibold text-red-600">{error}</p>}

      {group && (
        <main className="flex flex-col gap-4 px-10 py-10">
          <ApplicantsTitle group={group} count={pending.length} sort={sort} setSort={setSort} />

          {goodMatches.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              canAccept={group.status === "OPEN"}
              onAccept={() => decide(acceptRequest, applicant)}
              onDecline={() => decide(declineRequest, applicant)}
            />
          ))}

          {[...lowMatches, ...(showLow ? hiddenMatches : [])].map((applicant) => (
            <LowMatchRow
              key={applicant.id}
              applicant={applicant}
              group={group}
              canAccept={group.status === "OPEN"}
              onAccept={() => decide(acceptRequest, applicant)}
              onDecline={() => decide(declineRequest, applicant)}
            />
          ))}

          {hiddenMatches.length > 0 && !showLow && (
            <button
              onClick={() => setShowLow(true)}
              className="mx-auto mt-2 flex items-center gap-2 text-sm font-bold text-peach-dark hover:underline"
            >
              <Diamond />
              Show {hiddenMatches.length} more {hiddenMatches.length === 1 ? "applicant" : "applicants"} under 60%
            </button>
          )}

          <GroupMembers user={user} members={members} group={group} />
        </main>
      )}
    </div>
  );
}
