import { useState } from "react";
import Leaf from "../autumn/Leaf.jsx";
import { initialsOf } from "../../api.js";
import { t } from "../../i18n.js";

// Same rules as the backend. \p{L} = any letter (Latin, Cyrillic, Kazakh...), \p{N} = any digit
function checkUsername(name, studentId) {
  if (name.length < 3 || name.length > 30) {
    return t("profile.usernameTooShort");
  }
  if (!/^[\p{L}\p{N} ._-]+$/u.test(name)) {
    return t("profile.usernameBadChars");
  }
  // All-number names look like student IDs, so only your own ID is allowed
  if (!/\p{L}/u.test(name) && name !== studentId) {
    return t("profile.usernameNeedsLetter");
  }
  return "";
}

// profile is null for guests
export default function ProfileCard({ profile, onSaveUsername }) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  const name = profile ? profile.name : t("common.guest");

  function startEditing() {
    setNewName(profile.name);
    setError("");
    setEditing(true);
  }

  function save(e) {
    e.preventDefault();

    const cleanName = newName.trim().replace(/\s+/g, " ");
    const nameError = checkUsername(cleanName, profile.studentId);
    setError(nameError);
    if (nameError !== "") return;

    onSaveUsername(cleanName)
      .then(() => setEditing(false))
      .catch((e) => setError(e.status === 409 ? t("profile.usernameTaken") : e.message));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <div className="flex size-24 shrink-0 items-center justify-center rounded-full bg-navy text-3xl font-bold text-white">
          {initialsOf(name)}
        </div>
        <div className="min-w-0">
          <h1 className="text-[26px] font-semibold break-words">{name}</h1>
          {profile && (
            <p className="text-[14px] font-medium leading-relaxed text-ink">
              {t("profile.studentId", { id: profile.studentId })}
              <br />
              {profile.email}
            </p>
          )}
        </div>
      </div>

      {profile && !editing && (
        <button onClick={startEditing} className="w-fit text-[13px] font-bold text-peach-dark hover:underline">
          {t("profile.changeUsername")}
        </button>
      )}

      {editing && (
        <form onSubmit={save} className="flex flex-col gap-2 rounded-2xl border border-navy/10 bg-paper p-4">
          <label>
            <span className="mb-2 block text-xs font-semibold text-ink">{t("profile.usernameLabel")}</span>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              maxLength={30}
              autoFocus
              className={
                "w-full rounded-xl border bg-warm px-4 py-3 text-[15px] font-medium outline-none focus:border-navy/40 " +
                (error ? "border-red-400" : "border-navy/10")
              }
            />
          </label>
          {error ? (
            <span className="text-xs font-semibold text-red-600">{error}</span>
          ) : (
            <span className="text-xs font-medium text-muted">{t("profile.usernameHint")}</span>
          )}
          <div className="mt-1 flex gap-2">
            <button type="submit" className="rounded-full bg-navy px-5 py-2.5 text-[13px] font-bold text-white hover:bg-navy-dark">
              {t("common.save")}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-full border border-navy/20 px-5 py-2.5 text-[13px] font-semibold hover:bg-warm"
            >
              {t("common.cancel")}
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-navy/15 bg-paper px-4 py-2 text-[13px] font-semibold">
          {profile ? t("profile.verified") : t("common.notLoggedIn")}
        </span>
      </div>

      {profile && profile.sessionsThisMonth > 0 && (
        <span className="flex w-fit items-center gap-2 rounded-full bg-peach-light px-4 py-2 text-[13px] font-semibold">
          <Leaf size={14} color="#b9703c" />
          {t("profile.thisMonth", { count: profile.sessionsThisMonth })}
        </span>
      )}
    </div>
  );
}
