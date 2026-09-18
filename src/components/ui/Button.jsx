import "./Button.css";

/**
 * variant: "primary" | "secondary" | "peach" | "ghostOnNavy" | "quiet"
 * size:    "md" | "sm" | "lg"
 */
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
