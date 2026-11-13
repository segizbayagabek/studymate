import { Link } from "react-router-dom";
import Label from "./Label.jsx";
import { t } from "../../i18n.js";

export default function LoginPrompt({ onClose }) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 px-6">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-paper p-7 shadow-xl">
        <Label className="mb-3">{t("loginPrompt.label")}</Label>
        <h2 className="mb-2 text-[22px] font-semibold">{t("loginPrompt.title")}</h2>
        <p className="mb-6 text-sm font-medium leading-relaxed text-muted">
          {t("loginPrompt.text")}
        </p>

        <div className="flex flex-col gap-2.5">
          <Link to="/" className="rounded-full bg-navy p-3.5 text-center text-sm font-bold text-white hover:bg-navy-dark">
            {t("loginPrompt.logIn")}
          </Link>
          <button onClick={onClose} className="rounded-full border border-navy/20 p-3.5 text-sm font-bold hover:bg-warm">
            {t("loginPrompt.keepLooking")}
          </button>
        </div>
      </div>
    </div>
  );
}
