// src/pages/jobs/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTenant } from "../../utils/getTenant";
import DashboardCard from "../../components/cards/DashboardCard";

// Tailwind theme color map
const colorMap = {
  red: {
    text: "text-red-700",
    textLight: "text-red-500",
    bg: "bg-red-600",
    bgLight: "bg-red-100",
    border: "border-red-600",
  },
  purple: {
    text: "text-purple-700",
    textLight: "text-purple-500",
    bg: "bg-purple-600",
    bgLight: "bg-purple-100",
    border: "border-purple-600",
  },
  blue: {
    text: "text-blue-700",
    textLight: "text-blue-500",
    bg: "bg-blue-600",
    bgLight: "bg-blue-100",
    border: "border-blue-600",
  },
};

const Dashboard = () => {
  const tenant = getTenant(); // e.g. "ptap"
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found, please login again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`http://${tenant}.localhost/api/companies`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();

        // Match company by tenant_name
        const tenantCompany = data.allEmployees.find(
          (c) => c.tenant_name === tenant
        );

        if (!tenantCompany) {
          throw new Error("Tenant not found in company list");
        }

        setCompany(tenantCompany);
      } catch (err) {
        console.error("Error fetching company:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [tenant]);

  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  // pick theme from backend or fallback
  const theme = company?.theme || "red";
  const colors = colorMap[theme] || colorMap["red"];

  return (
    <div className="p-6 space-y-6 text-gray-800">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">
        Welcome to {company?.name} Dashboard
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Jobs Open" value="74" themeColor={theme} />
        <DashboardCard title="Ongoing Test Taker" value="21" themeColor={theme} />
        <DashboardCard title="Candidate Pool" value="2647" themeColor={theme} />
        <DashboardCard title="Test Completion Rate" value="30.4%" themeColor={theme} />
      </div>

      {/* Company Profile + Create Job/Test */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Profile */}
        <div className="col-span-1 lg:col-span-2 p-6 bg-white rounded shadow">
          <h2 className={`text-lg font-bold ${colors.text} mb-2`}>Company Profile</h2>
          <p className="mb-4 text-sm">Company profile sudah lengkap</p>
          <div className={`w-full ${colors.bgLight} h-2 rounded mb-4`}>
            <div className={`h-full ${colors.bg} w-full rounded`}></div>
          </div>
          <div className="flex gap-4">
            <button className={`px-4 py-2 ${colors.bg} text-white rounded`}>View Page</button>
            <button className={`px-4 py-2 border ${colors.border} ${colors.text} rounded`}>Edit Page</button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-6">
          <div className="p-6 bg-white rounded shadow flex flex-col justify-between">
            <h3 className={`${colors.text} font-semibold mb-2`}>Create Job</h3>
            <p className="text-sm text-gray-600 mb-4">
              Buat lowongan untuk mulai mendapatkan kandidat.
            </p>
            <Link
              to="/positions"
              className={`w-full text-center px-4 py-2 ${colors.bg} text-white rounded`}
            >
              + Create Job
            </Link>
          </div>

          <div className="p-6 bg-white rounded shadow flex flex-col justify-between">
            <h3 className={`${colors.text} font-semibold mb-2`}>Create Test</h3>
            <p className="text-sm text-gray-600 mb-4">
              Buat tes sebagai bagian dari seleksi lowongan ataupun sebagai tes terpisah.
            </p>
            <Link
              to="/tests"
              className={`w-full text-center px-4 py-2 ${colors.bg} text-white rounded`}
            >
              + Create Test
            </Link>
          </div>
        </div>
      </div>

      {/* Job and Test Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Jobs */}
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between mb-4">
            <h3 className={`font-bold ${colors.text}`}>My Jobs</h3>
            <Link to="/positions" className={`text-sm ${colors.textLight} hover:underline`}>
              View all (898)
            </Link>
          </div>
          <ul className="text-sm space-y-3">
            <li className="flex justify-between">
              <span>tes 1</span>
              <span className="text-green-600 font-medium">Open</span>
            </li>
            <li className="flex justify-between">
              <span>test 2</span>
              <span className={`${colors.bg} text-white font-medium px-2 py-0.5 rounded`}>
                Closed
              </span>
            </li>
            <li className="flex justify-between">
              <span>test 3</span>
              <span className="text-yellow-500 font-medium">Drafted</span>
            </li>
          </ul>
        </div>

        {/* My Tests */}
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between mb-4">
            <h3 className={`font-bold ${colors.text}`}>My Test</h3>
            <Link to="/tests" className={`text-sm ${colors.textLight} hover:underline`}>
              View all (4254)
            </Link>
          </div>
          <ul className="text-sm space-y-4">
            <li>
              <p className="font-medium">tes tkb</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Finished • 1 Person</span>
                <span className="text-xs">100%</span>
              </div>
              <div className={`w-full ${colors.bgLight} h-2 rounded mt-1`}>
                <div className={`h-full ${colors.bg} w-full rounded`}></div>
              </div>
            </li>
            <li>
              <p className="font-medium">TEST LA</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Started • 1 Person</span>
                <span className="text-xs">100%</span>
              </div>
              <div className={`w-full ${colors.bgLight} h-2 rounded mt-1`}>
                <div className={`h-full ${colors.bg} w-full rounded`}></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
