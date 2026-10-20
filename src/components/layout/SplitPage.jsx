import "./SplitPage.css";

/** Main column + warm sidebar, collapsing to one column on tablet. */
export default function SplitPage({ children, aside, asideWidth = 316, reverse = false }) {
  return (
    <div
      className={`sm-split ${reverse ? "sm-split--reverse" : ""}`}
      style={{ "--sm-aside": `${asideWidth}px` }}
    >
      <div className="sm-split__main">{children}</div>
      <aside className="sm-split__aside">{aside}</aside>
    </div>
  );
}
