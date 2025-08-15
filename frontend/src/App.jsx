// src/App.jsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

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

// 🔐 Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("user");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// 🔁 Custom layout wrapper
const LayoutWrapper = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`flex-1 transition-all duration-300 ${collapsed ? "ml-20" : "ml-60"}`}>
        <Topbar collapsed={collapsed} />
        <main className="pt-20 px-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs/:id"
              element={
                <ProtectedRoute>
                  <JobDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applicants"
              element={
                <ProtectedRoute>
                  <Applicants />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applicants/:id"
              element={
                <ProtectedRoute>
                  <ApplicantDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <Help />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// 🔁 Main app
function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
