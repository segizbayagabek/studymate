import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Browse from "./pages/Browse.jsx";
import Create from "./pages/Create.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/create" element={<Create />} />

      {/* Any other address (pages we haven't built yet) goes back to Browse */}
      <Route path="*" element={<Navigate to="/browse" />} />
    </Routes>
  );
}
