import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import JobDetail from "./pages/JobDetail"; 
import Applicants from "./pages/Applicants";
import ApplicantDetail from "./pages/ApplicantDetail";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-60">
          <Topbar />
          <main className="pt-20 px-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/applicants" element={<Applicants />} />
              <Route path="/applicants/:id" element={<ApplicantDetail />} />
              {/* Other routes later */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
