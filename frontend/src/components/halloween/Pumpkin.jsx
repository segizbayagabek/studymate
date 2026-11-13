// One jack-o'-lantern drawn as a picture (SVG), same style as the design mockup
export default function Pumpkin({ size }) {
  return (
    <svg className="block" viewBox="0 0 352 384" width={size} height={size * (384 / 352)}>
      {/* soft shadow on the ground */}
      <ellipse cx="176" cy="372" rx="150" ry="12" fill="rgba(0,0,0,0.12)" />

      {/* stem */}
      <path d="M150 114 C138 62 168 12 220 5 L220 38 C194 42 180 72 192 108 Z" fill="#7a6548" />

      {/* body: a wide pumpkin with two lighter stripes in the middle */}
      <ellipse cx="176" cy="240" rx="176" ry="132" fill="#c88a60" />
      <ellipse cx="176" cy="240" rx="100" ry="132" fill="#d69a6c" />
      <ellipse cx="176" cy="240" rx="44" ry="132" fill="#e0a678" />

      {/* face: eyes and a zigzag smile (it flickers like a candle, see halloween.css) */}
      <g className="pumpkin-face" fill="#5c4f45">
        <path d="M67 217 L110 152 L133 217 Z" />
        <path d="M220 217 L243 152 L286 217 Z" />
        <path d="M88 262 L133 283 L176 272 L220 283 L264 262 C254 306 222 340 176 340 C130 340 98 306 88 262 Z" />
      </g>
    </svg>
  );
}
