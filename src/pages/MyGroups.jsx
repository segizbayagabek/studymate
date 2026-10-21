import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import MyGroupsTitle from "../components/groups/MyGroupsTitle.jsx";
import OrganizedGroups from "../components/groups/OrganizedGroups.jsx";
import { getMyGroups, getUser } from "../api.js";

export default function MyGroups() {
  const user = getUser();
  const userId = user ? user.id : null;
  const [organized, setOrganized] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    getMyGroups(userId).then(setOrganized).catch((e) => setError(e.message));
  }, [userId]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar active="/groups" />

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-8 py-10">
        <MyGroupsTitle count={organized.length} />

        {error && <p className="text-[13px] font-semibold text-red-600">{error}</p>}

        <OrganizedGroups groups={organized} />
      </main>
    </div>
  );
}
