import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Browse from "./pages/Browse.jsx";
import Create from "./pages/Create.jsx";
import MyGroups from "./pages/MyGroups.jsx";
import Applicants from "./pages/Applicants.jsx";
import GroupDetail from "./pages/GroupDetail.jsx";
import Requested from "./pages/Requested.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/create" element={<Create />} />
      <Route path="/groups" element={<MyGroups />} />
      <Route path="/groups/:groupId" element={<GroupDetail />} />
      <Route path="/groups/:groupId/applicants" element={<Applicants />} />
      <Route path="/requested" element={<Requested />} />

      {/* Any other address (pages we haven't built yet) goes back to Browse */}
      <Route path="*" element={<Navigate to="/browse" />} />
    </Routes>
  );
}
