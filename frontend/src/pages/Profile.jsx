import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import GuestNote from "../components/common/GuestNote.jsx";
import ProfileCard from "../components/profile/ProfileCard.jsx";
import ProfileStats from "../components/profile/ProfileStats.jsx";
import StatsNote from "../components/profile/StatsNote.jsx";
import SubjectList from "../components/profile/SubjectList.jsx";
import StudyStyle from "../components/profile/StudyStyle.jsx";
import RecentSessions from "../components/profile/RecentSessions.jsx";
import Settings from "../components/profile/Settings.jsx";
import { changeUsername, getProfile, getUser, logout, saveUser, updateProfile } from "../api.js";
import { t } from "../i18n.js";

export default function Profile() {
  const user = getUser();
  const userId = user ? user.id : null;
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    getProfile(userId).then(setProfile).catch((e) => setError(e.message));
  }, [userId]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  // Saves subjects, study style and favourite places.
  // "changes" holds only the part that changed, e.g. { studyStyle: "TALKATIVE" }
  function saveProfile(changes) {
    setError("");
    const updated = {
      subjects: profile.subjects,
      studyStyle: profile.studyStyle,
      favouritePlaces: profile.favouritePlaces,
      ...changes,
    };
    updateProfile(userId, updated).then(setProfile).catch((e) => setError(e.message));
  }

  // ProfileCard shows the error itself, so we give the request back to it
  function saveUsername(name) {
    return changeUsername(userId, name).then((saved) => {
      saveUser({ ...user, name: saved.name }); // so the top bar shows the new name too
      setProfile({ ...profile, name: saved.name });
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar active="/profile" />

      <div className="grid flex-1 lg:grid-cols-[420px_1fr]">
        <aside className="flex flex-col gap-7 border-r border-navy/10 bg-warm px-7 py-10">
          {(!user || profile) && <ProfileCard profile={profile} onSaveUsername={saveUsername} />}
          {profile && <ProfileStats profile={profile} />}
          {profile && <StatsNote />}
        </aside>

        <main className="flex flex-col gap-10 px-10 py-10">
          {error && <p className="text-[13px] font-semibold text-red-600">{error}</p>}
          {!user && <GuestNote>{t("profile.guestNote")}</GuestNote>}

          {profile && (
            <>
              <SubjectList subjects={profile.subjects} onSave={(subjects) => saveProfile({ subjects: subjects })} />
              <StudyStyle studyStyle={profile.studyStyle} places={profile.favouritePlaces} onSave={saveProfile} />
              <RecentSessions sessions={profile.recentSessions} />
            </>
          )}

          <Settings loggedIn={user !== null} onLogout={handleLogout} />
        </main>
      </div>
    </div>
  );
}
