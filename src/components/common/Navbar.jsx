import { Link } from "react-router-dom";
import crest from "../../assets/sdu-crest.png";

const links = [
  { label: "Browse", to: "/browse" },
  { label: "Create", to: "/create" },
  { label: "My groups", to: "/groups" },
  { label: "Profile", to: "/profile" },
];

export default function Navbar({ active }) {
  return (
    <header className="flex items-center justify-between gap-6 border-b border-navy/10 px-7 py-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={crest} alt="SDU University" className="h-7.5" />
        <span className="h-5 w-px bg-navy/15"></span>
        <span className="font-serif text-[19px] font-medium">Study Mate</span>
      </div>

      <nav className="flex gap-1 rounded-full bg-navy p-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={
              link.to === active
                ? "rounded-full bg-peach px-4.5 py-2 text-[12.5px] font-bold text-navy"
                : "rounded-full px-4.5 py-2 text-[12.5px] font-semibold text-white/70 hover:text-white"
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="flex gap-0.5 rounded-full bg-peach p-0.75 text-[11px] font-bold">
          <span className="rounded-full px-2.5 py-1 text-[#5A3418]">KZ</span>
          <span className="rounded-full px-2.5 py-1 text-[#5A3418]">RU</span>
          <span className="rounded-full bg-paper px-2.5 py-1 text-navy">EN</span>
        </div>
        <div className="flex size-8.5 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
          AT
        </div>
      </div>
    </header>
  );
}
