import Pumpkin from "./Pumpkin.jsx";
import "./halloween.css";

// A few pumpkins sitting in the bottom corners of the screen.
// "side" is the corner, "spot" is how far from that edge (in % of the screen width).
const pumpkins = [
  { side: "left", spot: 1, size: 72, wobbleTime: 4.5, glowDelay: 0 },
  { side: "left", spot: 6.5, size: 46, wobbleTime: 3.6, glowDelay: 2.3 },
  { side: "right", spot: 1.5, size: 86, wobbleTime: 5, glowDelay: 1.1 },
  { side: "right", spot: 8, size: 54, wobbleTime: 4, glowDelay: 3.4 },
  { side: "right", spot: 12.5, size: 34, wobbleTime: 3.2, glowDelay: 0.6 },
];

export default function PumpkinPatch() {
  // pointer-events-none lets clicks go "through" the pumpkins to the page below
  return (
    <div className="pumpkin-patch pointer-events-none fixed inset-x-0 bottom-0 z-40" aria-hidden="true">
      {pumpkins.map((pumpkin, i) => (
        <div
          key={i}
          className="pumpkin-wobble absolute bottom-0"
          style={{
            [pumpkin.side]: pumpkin.spot + "%",
            animationDuration: pumpkin.wobbleTime + "s",
            "--glow-delay": pumpkin.glowDelay + "s",
          }}
        >
          <Pumpkin size={pumpkin.size} />
        </div>
      ))}
    </div>
  );
}
