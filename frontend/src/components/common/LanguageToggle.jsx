import { language, languages, setLanguage } from "../../i18n.js";

// KZ / RU / EN buttons. The chosen one is white.
export default function LanguageToggle() {
  return (
    <div className="flex gap-0.5 rounded-full bg-peach p-0.75 text-[11px] font-bold">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={
            "rounded-full px-2.5 py-1 " +
            (lang.code === language ? "bg-paper text-navy" : "text-[#5A3418] hover:bg-paper/50")
          }
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
