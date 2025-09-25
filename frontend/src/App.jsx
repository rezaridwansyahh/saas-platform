// src/App.jsx
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

//Jobs Folder
import Dashboard from "./pages/jobs/Dashboard";
import JobDetail from "./pages/jobs/JobDetail";

//Positions Folder
import Positions from "./pages/positions/Positions";
import PositionEdit from "./pages/positions/PositionEdit";
import PositionDelete from "./pages/positions/PositionDelete";

//Applicants Folder
import Applicants from "./pages/applicants/Applicants";
import ApplicantDetail from "./pages/applicants/ApplicantDetail";
import ApplicantEdit from "./pages/applicants/ApplicantEdit";
import ApplicantAdd from "./pages/applicants/ApplicantAdd";

// Departments Folder
import Departments from "./pages/Departments/Departments";
import DepartmentsAdd from "./pages/Departments/DepartmentsAdd";


//Auth Folder
import Login from "./pages/auth/Login";
import RegisterEmployee from "./pages/auth/RegisterEmployee";
import RegisterUserConfirm from "./pages/auth/RegisterUserConfirm";

//Settings Folder
import Settings from "./pages/settings/Settings";

//Reports Folder
import BudgetPlanning from "./pages/reports/BudgetPlanning";
import TimeReports from "./pages/reports/TimeReports"

//Misc Folder
import Help from "./pages/misc/Help";
import NotFound from "./pages/misc/NotFound";
import ClockInOut from "./pages/misc/ClockInOut";

//Profile Folder
import Profile from "./pages/profile/Profile";

//Payroll Folder
import SalaryManagement from "./pages/payroll/SalaryManagement";
import Payslips from "./pages/payroll/Payslips";

//Components Folder
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

//Theme Provider
import { ThemeProvider } from "./context/ThemeContext";

import { isTokenExpired, getToken, clearToken } from "./utils/auth";
import { UserProvider } from "./context/UserContext";


import { getTenant } from "./utils/getTenant";


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

  // Redirect to login if no valid token
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
            
            {/* Departments */}
            <Route
              path="/Departments"
              element={
                <ProtectedRoute>
                  <Departments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Departments/new"
              element={
                <ProtectedRoute>
                  <DepartmentsAdd />
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

function App() {
  useEffect(() => {
    const tenant = getTenant();
    if (tenant) {
      document.title = tenant.toUpperCase(); // e.g. "PTAP"
    } else {
      document.title = "ATS System"; // fallback
    }
  }, []);

    return (
    <UserProvider>
      <ThemeProvider>     {/* ✅ wrap theme provider here */}
        <LayoutWrapper />
      </ThemeProvider>
    </UserProvider>
  );
}
export default App;
