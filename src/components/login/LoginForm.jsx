import { useState } from "react";
import { useNavigate } from "react-router-dom";
import crest from "../../assets/sdu-crest.png";
import Label from "../common/Label.jsx";
import { login, saveUser } from "../../api.js";
import { languages, useI18n } from "../../i18n.js";

// The last 3 digits of a student ID are the order you enrolled in.
// No major takes more students than this in one year.
const biggestOrderNumber = 500;

// A student ID looks like 250118021:
//   25  = year you enrolled (2025)
//   01  = faculty
//   18  = major
//   021 = your number in the enrolment list
// Returns an error message, or "" if the ID looks real.
function checkStudentId(id, t) {
  if (id === "") {
    return t("Enter your student ID.");
  }

  // /^[0-9]{9}$/ means "exactly 9 digits, nothing else"
  if (!/^[0-9]{9}$/.test(id)) {
    return t("Your SDU email is your 9-digit student ID, e.g. 250118021@sdu.edu.kz");
  }

  const year = Number(id.slice(0, 2));
  const faculty = id.slice(2, 4);
  const major = id.slice(4, 6);
  const order = Number(id.slice(6, 9));

  // Only students who enrolled in the last 8 years can still be studying
  const thisYear = new Date().getFullYear() % 100; // 2026 -> 26
  const oldestYear = thisYear - 8;
  if (year < oldestYear || year > thisYear) {
    return "The first two digits should be the year you enrolled (" + oldestYear + "–" + thisYear + ").";
  }

  if (faculty === "00" || major === "00") {
    return t("This student ID doesn't look right. Check the faculty and major digits.");
  }

  if (order < 1 || order > biggestOrderNumber) {
    return "The last three digits should be between 001 and " + biggestOrderNumber + ".";
  }

  return "";
}

export default function LoginForm() {
  const { lang, setLang, t } = useI18n();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // If someone types the whole email, keep only the part before @sdu.edu.kz
    const id = username.trim().replace("@sdu.edu.kz", "");
    const idError = checkStudentId(id, t);
    const passError = password === "" ? t("Enter your password.") : "";

    setUsernameError(idError);
    setPasswordError(passError);

    if (idError !== "" || passError !== "") {
      return;
    }

    login(id, password)
      .then((user) => {
        saveUser(user);
        navigate("/browse");
      })
      .catch((error) => setPasswordError(error.message));
  }

  return (
    <div className="relative flex items-center justify-center px-6 py-12">
      <div className="absolute top-6 right-8 flex gap-0.5 rounded-full bg-peach p-0.75 text-[11px] font-bold" role="group" aria-label="Language">
        {languages.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            className={
              code === lang
                ? "cursor-pointer rounded-full bg-paper px-2.5 py-1 text-navy"
                : "cursor-pointer rounded-full px-2.5 py-1 text-[#5A3418] hover:text-navy"
            }
          >
            {code}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-7">
        {/* Small logo, only on small screens where the navy half is hidden */}
        <div className="flex items-center gap-3 lg:hidden">
          <img src={crest} alt="SDU University" className="h-8" />
          <span className="font-serif text-xl font-medium">Study Mate</span>
        </div>

        <div>
          <Label className="mb-3">{t("Student access")}</Label>
          <h1 className="mb-2 text-[28px] font-semibold">{t("Welcome back")}</h1>
          <p className="text-sm font-medium text-muted">
            {t("Log in with the university account you got when you enrolled at SDU.")}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <label>
            <span className="mb-2 block text-xs font-semibold text-ink">{t("SDU email")}</span>
            <div
              className={
                "flex items-center rounded-xl border bg-warm px-4 focus-within:border-navy/40 " +
                (usernameError ? "border-red-400" : "border-navy/10")
              }
            >
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="250118021"
                inputMode="numeric"
                className="w-full bg-transparent py-3.5 text-[15px] font-medium outline-none placeholder:text-muted/60"
              />
              <span className="text-[15px] font-medium text-muted">@sdu.edu.kz</span>
            </div>
            {usernameError && <span className="mt-2 block text-xs font-semibold text-red-600">{usernameError}</span>}
          </label>

          <label>
            <span className="mb-2 block text-xs font-semibold text-ink">{t("Password")}</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={
                "w-full rounded-xl border bg-warm px-4 py-3.5 text-[15px] font-medium outline-none focus:border-navy/40 " +
                (passwordError ? "border-red-400" : "border-navy/10")
              }
            />
            {passwordError && <span className="mt-2 block text-xs font-semibold text-red-600">{passwordError}</span>}
          </label>

          <div className="flex items-center justify-between text-xs font-semibold">
            {/* type="button" so clicking it doesn't submit the form */}
            <button type="button" onClick={() => setKeepSignedIn(!keepSignedIn)} className="flex items-center gap-2 text-ink">
              <span
                className={
                  "flex size-4 items-center justify-center rounded-[5px] text-[10px] text-peach " +
                  (keepSignedIn ? "bg-navy" : "border border-navy/30")
                }
              >
                {keepSignedIn ? "✓" : ""}
              </span>
              {t("Keep me signed in")}
            </button>
            <a href="#" className="text-peach-dark hover:underline">{t("Forgot password?")}</a>
          </div>
        </div>

        <button type="submit" className="rounded-full bg-navy p-4 text-sm font-bold text-white hover:bg-navy-dark">
          {t("Log in with SDU account")}
        </button>

        <p className="text-[11.5px] font-medium leading-relaxed text-muted">
          {t("Provided by SDU University · Student Affairs. By continuing you accept the campus community rules.")}
        </p>
      </form>
    </div>
  );
}
