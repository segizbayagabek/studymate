import AppHeader from "./AppHeader";
import "./AppLayout.css";

/** The framed screen shell: warm page, one header, one rounded card. */
export default function AppLayout({ children, bleed = false }) {
  return (
    <div className="sm-shell">
      <div className="sm-screen">
        <AppHeader />
        <div className={bleed ? "" : "sm-layout__body"}>{children}</div>
      </div>
    </div>
  );
}
