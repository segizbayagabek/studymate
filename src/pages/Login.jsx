import LoginHero from "../components/login/LoginHero.jsx";
import LoginForm from "../components/login/LoginForm.jsx";

export default function Login() {
  return (
    <div className="grid min-h-screen bg-paper lg:grid-cols-2">
      <LoginHero />
      <LoginForm />
    </div>
  );
}
