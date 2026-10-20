import { Navigate, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Login from "./pages/Login.jsx";
import Browse from "./pages/Browse.jsx";
import Create from "./pages/Create.jsx";
=======
import SignIn from "./pages/SignIn";
import Browse from "./pages/Browse";
import CreateRequest from "./pages/CreateRequest";
import Applicants from "./pages/Applicants";
import GroupDetail from "./pages/GroupDetail";
import Profile from "./pages/Profile";
>>>>>>> origin/main

export default function App() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Login />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/create" element={<Create />} />

      {/* Any other address (pages we haven't built yet) goes back to Browse */}
      <Route path="*" element={<Navigate to="/browse" />} />
=======
      <Route path="/" element={<SignIn />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/create" element={<CreateRequest />} />
      <Route path="/applicants" element={<Applicants />} />
      <Route path="/groups" element={<GroupDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
>>>>>>> origin/main
    </Routes>
  );
}
