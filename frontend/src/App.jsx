import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import JobDetail from "./pages/JobDetail";
import Applicants from "./pages/Applicants";
import ApplicantDetail from "./pages/ApplicantDetail";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

// 🔁 Custom wrapper to use useLocation outside Router
const LayoutWrapper = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    // 🔒 Login page should NOT show Sidebar or Topbar
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  // ✅ Default app layout with Sidebar + Topbar
  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`flex-1 transition-all duration-300 ${collapsed ? "ml-20" : "ml-60"}`}>
        <Topbar collapsed={collapsed} />
        <main className="pt-20 px-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/applicants" element={<Applicants />} />
            <Route path="/applicants/:id" element={<ApplicantDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// 🔁 Main App wraps everything in Router
function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
