import { useState } from "react";
import { t } from "../../i18n.js";

export default function DarkModeToggle() {
  // main.jsx already put the "dark" class on <html> if dark mode was saved, so we just read it
  const [on, setOn] = useState(document.documentElement.classList.contains("dark"));

  function toggle() {
    document.documentElement.classList.toggle("dark", !on);
    localStorage.setItem("theme", on ? "light" : "dark");
    setOn(!on);
  }

  return (
    <button
      onClick={toggle}
      title={on ? t("profile.darkModeOn") : t("profile.darkModeOff")}
      className={"flex h-7 w-12 items-center rounded-full p-1 " + (on ? "justify-end bg-peach" : "bg-navy/20")}
    >
      <span className="size-5 rounded-full bg-white shadow"></span>
    </button>
  );
}
