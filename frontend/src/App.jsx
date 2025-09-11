// src/App.jsx
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import JobDetail from "./pages/JobDetail";
import Positions from "./pages/Positions";
import PositionEdit from "./pages/PositionEdit";
import PositionDelete from "./pages/PositionDelete";
import Applicants from "./pages/Applicants";
import ApplicantDetail from "./pages/ApplicantDetail";
import ApplicantEdit from "./pages/ApplicantEdit";
import ApplicantAdd from "./pages/ApplicantAdd";
import Login from "./pages/Login";
import RegisterEmployee from "./pages/RegisterEmployee";
import RegisterUserConfirm from "./pages/RegisterUserConfirm";
import Settings from "./pages/Settings";
import BudgetPlanning from "./pages/BudgetPlanning";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

import SalaryManagement from "./pages/SalaryManagement";
import Payslips from "./pages/Payslips";
import ClockInOut from "./pages/ClockInOut";
import TimeReports from "./pages/TimeReports";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import { isTokenExpired, getToken, clearToken } from "./utils/auth";
import { UserProvider } from "./context/UserContext";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const token = getToken();
  const expired = isTokenExpired();

  if (!token || expired) {
    clearToken();
    return <Navigate to="/login" replace />;
  }
  return children;
};

const LayoutWrapper = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = ["/login", "/register", "/register-user"].includes(
    location.pathname
  );

  // 🔑 Redirect to login if no valid token
  useEffect(() => {
    const token = getToken();
    const expired = isTokenExpired();

    if (!token || expired) {
      clearToken();
      if (!isAuthPage) {
        navigate("/login");
      }
    }
  }, [navigate, location.pathname]);

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterEmployee />} />
        <Route path="/register-user" element={<RegisterUserConfirm />} />
      </Routes>
    );
  }

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-60"
        }`}
      >
        <Topbar collapsed={collapsed} />
        <main className="pt-20 px-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Jobs */}
            <Route
              path="/jobs/:id"
              element={
                <ProtectedRoute>
                  <JobDetail />
                </ProtectedRoute>
              }
            />

            {/* Positions */}
            <Route
              path="/positions"
              element={
                <ProtectedRoute>
                  <Positions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/positions/:id/edit"
              element={
                <ProtectedRoute>
                  <PositionEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/positions/:id/delete"
              element={
                <ProtectedRoute>
                  <PositionDelete />
                </ProtectedRoute>
              }
            />

            {/* Applicants */}
            <Route
              path="/applicants"
              element={
                <ProtectedRoute>
                  <Applicants />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applicants/new"
              element={
                <ProtectedRoute>
                  <ApplicantAdd />
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
              path="/applicants/:id/edit"
              element={
                <ProtectedRoute>
                  <ApplicantEdit />
                </ProtectedRoute>
              }
            />

            {/* Payroll */}
            <Route
              path="/payslips"
              element={
                <ProtectedRoute>
                  <Payslips />
                </ProtectedRoute>
              }
            />
            <Route
              path="/salary-management"
              element={
                <ProtectedRoute>
                  <SalaryManagement />
                </ProtectedRoute>
              }
            />

            {/* Time Tracking */}
            <Route
              path="/clock-in-out"
              element={
                <ProtectedRoute>
                  <ClockInOut />
                </ProtectedRoute>
              }
            />
            <Route
              path="/time-reports"
              element={
                <ProtectedRoute>
                  <TimeReports />
                </ProtectedRoute>
              }
            />

            {/* Other Pages */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budget-planning"
              element={
                <ProtectedRoute>
                  <BudgetPlanning />
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
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// ✅ Wrap app with UserProvider
function App() {
  return (
    <UserProvider>
      <LayoutWrapper />
    </UserProvider>
  );
}

export default App;
