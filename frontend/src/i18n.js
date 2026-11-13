import en from "./translations/en.js";
import ru from "./translations/ru.js";
import kz from "./translations/kz.js";

const texts = { en: en, ru: ru, kz: kz };

// The buttons in the top bar, in this order
export const languages = [
  { code: "kz", label: "KZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

// The chosen language is saved in the browser. English until someone picks another one.
const saved = localStorage.getItem("language");
export const language = texts[saved] ? saved : "en";

// Used to pick word forms for numbers (1 seat, 2 seats)
const locales = { en: "en-GB", ru: "ru-RU", kz: "kk-KZ" };
const locale = locales[language];

// Save the new language and reload the page, so every page shows the new texts
export function setLanguage(code) {
  localStorage.setItem("language", code);
  window.location.reload();
}

// Find a text by its key, e.g. t("profile.settings") -> "Settings"
function find(dictionary, key) {
  let text = dictionary;
  for (const part of key.split(".")) {
    text = text ? text[part] : undefined;
  }
  return text;
}

// t("profile.settings") gives the text in the current language.
// t("create.seatsLeft", { count: 3 }) also puts 3 in place of {count}
// and picks the right word form for that number (seat / seats).
export function t(key, values = {}) {
  let text = find(texts[language], key);
  if (text === undefined) text = find(en, key); // not translated yet: show English
  if (text === undefined) return key;

  if (typeof text === "object" && !Array.isArray(text)) {
    const form = new Intl.PluralRules(locale).select(values.count);
    text = text[form] || text.other;
  }

  for (const name in values) {
    text = text.replaceAll("{" + name + "}", values[name]);
  }
  return text;
}
