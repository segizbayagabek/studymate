import AppHeader from "./AppHeader";
import "./AppLayout.css";

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
