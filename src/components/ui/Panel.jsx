import "./Panel.css";

/**
 * The one card used everywhere.
 * tone: "paper" | "warm" | "navy" | "dashed"
 * accent: adds the peach left rule used on featured cards
 */
export default function Panel({
  tone = "paper",
  accent = false,
  raised = false,
  className = "",
  as: Tag = "div",
  children,
  ...rest
}) {
  return (
    <Tag
      className={[
        "sm-panel",
        `sm-panel--${tone}`,
        accent ? "sm-panel--accent" : "",
        raised ? "sm-panel--raised" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}
