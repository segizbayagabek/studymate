import "./Panel.css";

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
