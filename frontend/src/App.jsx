// import { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
//   useNavigate,
//   Navigate,
// } from "react-router-dom";

// import Dashboard from "./pages/Dashboard";
// import JobDetail from "./pages/JobDetail";
// import Positions from "./pages/Positions";               
// import PositionEdit from "./pages/PositionEdit";         // (Optional) if you have an edit page
// import PositionDelete from "./pages/PositionDelete";
// import Applicants from "./pages/Applicants";
// import ApplicantDetail from "./pages/ApplicantDetail";
// import ApplicantEdit from "./pages/ApplicantEdit";
// import ApplicantAdd from "./pages/ApplicantAdd";
// import Login from "./pages/Login";
// import RegisterEmployee from "./pages/RegisterEmployee";
// import RegisterUserConfirm from "./pages/RegisterUserConfirm";
// import Settings from "./pages/Settings";
// import Reports from "./pages/Reports";
// import Help from "./pages/Help";
// import NotFound from "./pages/NotFound";

// import Sidebar from "./components/Sidebar";
// import Topbar from "./components/Topbar";

// import { isTokenExpired, getToken, clearToken } from "./utils/auth";

// const ProtectedRoute = ({ children }) => {
//   const token = getToken();
//   const expired = isTokenExpired();

//   if (!token || expired) {
//     clearToken();
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// const LayoutWrapper = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isAuthPage = ["/login", "/register", "/register-user"].includes(location.pathname);

//   useEffect(() => {
//     const token = getToken();
//     const expired = isTokenExpired();

//     if (!token || expired) {
//       clearToken();
//       if (!isAuthPage) {
//         navigate("/login");
//       }
//     }
//   }, [navigate, location.pathname]);

//   if (isAuthPage) {
//     return (
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<RegisterEmployee />} />
//         <Route path="/register-user" element={<RegisterUserConfirm />} />
//       </Routes>
//     );
//   }

//   return (
//     <div className="flex">
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
//       <div className={`flex-1 transition-all duration-300 ${collapsed ? "ml-20" : "ml-60"}`}>
//         <Topbar collapsed={collapsed} />
//         <main className="pt-20 px-6">
//           <Routes>
//             <Route path="/" element={<Navigate to="/dashboard" />} />
//             <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            
//             {/* JobDetail stays if you still use jobs (or change if you want) */}
//             <Route path="/jobs/:id" element={<ProtectedRoute><JobDetail /></ProtectedRoute>} />

//             {/* Positions routes */}
//             <Route path="/positions" element={<ProtectedRoute><Positions /></ProtectedRoute>} />
//             <Route path="/positions/:id/edit" element={<ProtectedRoute><PositionEdit /> </ProtectedRoute>} />
//             <Route path="/positions/:id/delete" element={<ProtectedRoute> <PositionDelete /> </ProtectedRoute>}/>


//             {/* Applicants */}
//             <Route path="/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
//             <Route path="/applicants/new" element={<ProtectedRoute><ApplicantAdd /></ProtectedRoute>} />
//             <Route path="/applicants/:id" element={<ProtectedRoute><ApplicantDetail /></ProtectedRoute>} />
//             <Route path="/applicants/:id/edit" element={<ProtectedRoute><ApplicantEdit /></ProtectedRoute>} />

//             <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
//             <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
//             <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <LayoutWrapper />
//     </Router>
//   );
// }

// export default App;


// App.jsx
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
import Reports from "./pages/Reports";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import { isTokenExpired, getToken, clearToken } from "./utils/auth";

// 🔒 Protected Route wrapper
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
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
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

// ✅ App now only handles layout + routing
function App() {
  return <LayoutWrapper />;
}

export default App;
