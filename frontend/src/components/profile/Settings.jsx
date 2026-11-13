import { Link } from "react-router-dom";
import Label from "../common/Label.jsx";
import LanguageToggle from "../common/LanguageToggle.jsx";
import DarkModeToggle from "./DarkModeToggle.jsx";
import { t } from "../../i18n.js";

function Row({ title, text, children }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-navy/10 px-7 py-5 last:border-b-0">
      <div>
        <div className="text-[15px] font-semibold">{title}</div>
        <div className="text-[13px] font-medium text-muted">{text}</div>
      </div>
      {children}
    </div>
  );
}

export default function Settings({ loggedIn, onLogout }) {
  return (
    <section>
      <Label className="mb-4">{t("profile.settings")}</Label>

      <div className="flex flex-col rounded-2xl border border-navy/10">
        <Row title={t("profile.darkMode")} text={t("profile.darkModeText")}>
          <DarkModeToggle />
        </Row>

        <Row title={t("profile.language")} text={t("profile.languageText")}>
          <LanguageToggle />
        </Row>

        {loggedIn ? (
          <Row title={t("common.logOut")} text={t("profile.logOutText")}>
            <button
              onClick={onLogout}
              className="rounded-full border border-clay/40 px-5 py-2.5 text-[13px] font-bold text-clay hover:bg-clay/10"
            >
              {t("common.logOut")}
            </button>
          </Row>
        ) : (
          <Row title={t("profile.guestTitle")} text={t("profile.guestText")}>
            <Link to="/" className="rounded-full bg-navy px-5 py-2.5 text-[13px] font-bold text-white hover:bg-navy-dark">
              {t("common.logIn")}
            </Link>
          </Row>
        )}
      </div>
    </section>
  );
}
