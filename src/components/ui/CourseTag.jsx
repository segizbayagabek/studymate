import "./CourseTag.css";

export default function CourseTag({ tone = "navy", children }) {
  return <span className={`sm-course sm-course--${tone}`}>{children}</span>;
}
