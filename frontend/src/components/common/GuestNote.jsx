import { Link } from "react-router-dom";
import { t } from "../../i18n.js";

export default function GuestNote({ children }) {
  return (
    <div className="rounded-2xl border border-dashed border-navy/20 p-6 text-sm font-medium text-muted">
      {children}{" "}
      <Link to="/" className="font-bold text-peach-dark hover:underline">
        {t("common.logIn")}
      </Link>
    </div>
  );
}
