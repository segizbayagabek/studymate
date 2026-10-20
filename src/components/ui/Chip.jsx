import "./Chip.css";

/** tone: "default" | "active" | "outline" | "dashed" | "warm" */
export default function Chip({ tone = "default", children, className = "", as: Tag = "span", ...rest }) {
  return (
    <Tag className={`sm-chip sm-chip--${tone} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
