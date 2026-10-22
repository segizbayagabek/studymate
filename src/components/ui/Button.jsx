import "./Button.css";

export default function Button({
  variant = "primary",
  size = "md",
  block = false,
  className = "",
  as: Tag = "button",
  ...rest
}) {
  return (
    <Tag
      className={[
        "sm-btn",
        `sm-btn--${variant}`,
        `sm-btn--${size}`,
        block ? "sm-btn--block" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
