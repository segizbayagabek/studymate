import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import crest from "../../assets/sdu-crest.png";
import Label from "../common/Label.jsx";
import { logout, saveUser, sendCode, verifyCode } from "../../api.js";
import { t } from "../../i18n.js";


const biggestOrderNumber = 500;

function checkStudentId(id) {
  if (id === "") {
    return t("login.errorEmpty");
  }

  if (!/^[0-9]{9}$/.test(id)) {
    return t("login.errorFormat");
  }

  const year = Number(id.slice(0, 2));
  const faculty = id.slice(2, 4);
  const major = id.slice(4, 6);
  const order = Number(id.slice(6, 9));


  const thisYear = new Date().getFullYear() % 100; 
  const oldestYear = thisYear - 8;
  if (year < oldestYear || year > thisYear) {
    return t("login.errorYear", { from: oldestYear, to: thisYear });
  }

  if (faculty === "00" || major === "00") {
    return t("login.errorFaculty");
  }

  if (order < 1 || order > biggestOrderNumber) {
    return t("login.errorOrder", { max: biggestOrderNumber });
  }

  return "";
}

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeSentTo, setCodeSentTo] = useState("");
  const [note, setNote] = useState("");

  const navigate = useNavigate();

  function handleSendCode(e) {
    e.preventDefault();

    const id = username.trim().replace("@sdu.edu.kz", "");
    const idError = checkStudentId(id);
    setUsernameError(idError);

    if (idError !== "") {
      return;
    }

    sendCode(id)
      .then(() => {
        setCodeSentTo(id);
        setCode("");
        setCodeError("");
      })
      .catch((error) => setUsernameError(error.message));
  }

  // Step 2: check the code and log in
  function handleLogin(e) {
    e.preventDefault();

    if (!/^[0-9]{6}$/.test(code)) {
      setCodeError(t("login.errorCode"));
      return;
    }

    verifyCode(codeSentTo, code)
      .then((user) => {
        saveUser(user);
        navigate("/browse");
      })
      .catch((error) => setCodeError(error.message));
  }

  function sendAgain() {
    setNote("");
    sendCode(codeSentTo)
      .then(() => setNote(t("login.newCodeSent")))
      .catch((error) => setCodeError(error.message));
  }

  function useDifferentEmail() {
    setCodeSentTo("");
    setCodeError("");
    setNote("");
  }

  return (
    <div className="flex items-center justify-center px-6 py-12">
      <form onSubmit={codeSentTo ? handleLogin : handleSendCode} className="flex w-full max-w-md flex-col gap-7">
        <div className="flex items-center gap-3 lg:hidden">
          <img src={crest} alt="SDU University" className="h-8" />
          <span className="font-serif text-xl font-medium">Study Mate</span>
        </div>

        <div>
          <Label className="mb-3">{t("login.label")}</Label>
          <h1 className="mb-2 text-[28px] font-semibold">{codeSentTo ? t("login.checkEmail") : t("login.welcome")}</h1>
          <p className="text-sm font-medium text-muted">
            {codeSentTo
              ? t("login.codeSent", { email: codeSentTo + "@sdu.edu.kz" })
              : t("login.intro")}
          </p>
        </div>

        {!codeSentTo && (
          <div className="flex flex-col gap-4">
            <label>
              <span className="mb-2 block text-xs font-semibold text-ink">{t("login.emailLabel")}</span>
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

            <button type="button" onClick={() => setKeepSignedIn(!keepSignedIn)} className="flex items-center gap-2 text-xs font-semibold text-ink">
              <span
                className={
                  "flex size-4 items-center justify-center rounded-[5px] text-[10px] text-peach " +
                  (keepSignedIn ? "bg-navy" : "border border-navy/30")
                }
              >
                {keepSignedIn ? "✓" : ""}
              </span>
              {t("login.keepSignedIn")}
            </button>
          </div>
        )}

        {codeSentTo && (
          <div className="flex flex-col gap-4">
            <label>
              <span className="mb-2 block text-xs font-semibold text-ink">{t("login.codeLabel")}</span>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="123456"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                autoFocus
                className={
                  "w-full rounded-xl border bg-warm px-4 py-3.5 text-[22px] font-semibold tracking-[0.4em] outline-none placeholder:text-muted/40 focus:border-navy/40 " +
                  (codeError ? "border-red-400" : "border-navy/10")
                }
              />
              {codeError && <span className="mt-2 block text-xs font-semibold text-red-600">{codeError}</span>}
              {note && <span className="mt-2 block text-xs font-semibold text-sage">{note}</span>}
            </label>

            <div className="flex items-center justify-between text-xs font-semibold">
              <button type="button" onClick={useDifferentEmail} className="text-ink hover:underline">
                {t("login.differentEmail")}
              </button>
              <button type="button" onClick={sendAgain} className="text-peach-dark hover:underline">
                {t("login.sendAgain")}
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button type="submit" className="rounded-full bg-navy p-4 text-sm font-bold text-white hover:bg-navy-dark">
            {codeSentTo ? t("common.logIn") : t("login.sendCode")}
          </button>
          <Link
            to="/browse"
            onClick={logout}
            className="rounded-full border border-navy/20 p-4 text-center text-sm font-bold text-navy hover:bg-warm"
          >
            {t("login.guest")}
          </Link>
        </div>

        <p className="text-[11.5px] font-medium leading-relaxed text-muted">
          {t("login.footer")}
        </p>
      </form>
    </div>
  );
}
