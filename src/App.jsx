import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Browse from "./pages/Browse";
import CreateRequest from "./pages/CreateRequest";
import Applicants from "./pages/Applicants";
import GroupDetail from "./pages/GroupDetail";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/create" element={<CreateRequest />} />
      <Route path="/applicants" element={<Applicants />} />
      <Route path="/groups" element={<GroupDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
