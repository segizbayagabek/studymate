import Leaf from "./Leaf.jsx";
import "./autumn.css";

const colors = ["#c2410c", "#b9703c", "#a3443a", "#d97706", "#e9a87c", "#7a5a12"];

// 16 leaves, each with its own random spot, size and speed (picked once when the page loads)
const leaves = Array.from({ length: 16 }, (_, i) => ({
  left: Math.random() * 100, // % from the left edge of the screen
  size: 14 + Math.random() * 14, // px
  color: colors[i % colors.length],
  fallTime: 10 + Math.random() * 10, // seconds to fall from top to bottom
  delay: -Math.random() * 20, // negative delay = the leaf is already mid-air when the page opens
  swayTime: 3 + Math.random() * 3, // seconds for one swing left-right
}));

export default function FallingLeaves() {
  // pointer-events-none lets clicks go "through" the leaves to the page below
  return (
    <div className="autumn-leaves pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="leaf-fall absolute -top-10"
          style={{ left: leaf.left + "%", animationDuration: leaf.fallTime + "s", animationDelay: leaf.delay + "s" }}
        >
          <div className="leaf-sway" style={{ animationDuration: leaf.swayTime + "s" }}>
            <Leaf size={leaf.size} color={leaf.color} />
          </div>
        </div>
      ))}
    </div>
  );
}
