import { useState } from "react";
import Leaf from "./Leaf.jsx";
import FallingLeaves from "./FallingLeaves.jsx";
import PumpkinPatch from "../halloween/PumpkinPatch.jsx";
import { t } from "../../i18n.js";

export default function AutumnToggle() {
  // The choice is saved in the browser, so it stays the same on every page (on by default)
  const [on, setOn] = useState(localStorage.getItem("autumn") !== "off");

  function toggle() {
    localStorage.setItem("autumn", on ? "off" : "on");
    setOn(!on);
  }

  return (
    <>
      <button
        onClick={toggle}
        title={on ? t("autumn.turnOff") : t("autumn.turnOn")}
        className={
          "flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold " +
          (on ? "border-peach-dark/30 bg-peach-light text-peach-dark" : "border-navy/15 text-muted hover:text-navy")
        }
      >
        <Leaf size={14} color="currentColor" />
        {t("autumn.label")}
        <span className={"flex h-4 w-7 items-center rounded-full p-0.5 " + (on ? "justify-end bg-peach-dark" : "bg-navy/20")}>
          <span className="size-3 rounded-full bg-white"></span>
        </span>
      </button>

      {on && <FallingLeaves />}
      {on && <PumpkinPatch />}
    </>
  );
}
