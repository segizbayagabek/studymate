import LoginHero from "../components/login/LoginHero.jsx";
import LoginForm from "../components/login/LoginForm.jsx";
import PumpkinPatch from "../components/halloween/PumpkinPatch.jsx";
import LanguageToggle from "../components/common/LanguageToggle.jsx";

export default function Login() {
  // Same setting as the Autumn switch in the top bar (on by default)
  const autumnOn = localStorage.getItem("autumn") !== "off";

  return (
    <div className="relative grid min-h-screen bg-paper lg:grid-cols-2">
      <LoginHero />
      <LoginForm />
      <div className="absolute top-6 right-6">
        <LanguageToggle />
      </div>
      {autumnOn && <PumpkinPatch />}
    </div>
  );
}
