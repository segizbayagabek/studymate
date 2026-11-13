import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { language } from "./i18n.js";

// Turn dark mode back on if it was picked last time (the toggle is on the Profile page)
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

// Tell the browser which language the page is in ("kk" is the code for Kazakh)
document.documentElement.lang = language === "kz" ? "kk" : language;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
