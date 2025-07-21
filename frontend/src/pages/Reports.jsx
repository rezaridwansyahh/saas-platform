// pages/Reports.jsx
import {
  Bar,
  Doughnut,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const Reports = () => {
  // Sample chart data
  const viewsData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Job Views",
        data: [120, 190, 300, 250],
        backgroundColor: "rgba(239, 68, 68, 0.7)",
      },
    ],
  };

  const conversionData = {
    labels: ["Applied", "Interviewed", "Hired"],
    datasets: [
      {
        data: [60, 25, 10],
        backgroundColor: ["#f87171", "#facc15", "#4ade80"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Hiring Pulse</h1>
      <p className="text-gray-600 mb-6">Visual insights into your job performance metrics</p>

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Total Views</p>
          <h2 className="text-xl font-semibold text-red-600">860</h2>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Applicants</p>
          <h2 className="text-xl font-semibold text-red-600">95</h2>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Conversion Rate</p>
          <h2 className="text-xl font-semibold text-red-600">10.5%</h2>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Avg. Time to Hire</p>
          <h2 className="text-xl font-semibold text-red-600">12 days</h2>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Views Over Time</h3>
          <Bar data={viewsData} />
        </div>

        {/* Conversion Chart */}
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Conversion Funnel</h3>
          <Doughnut data={conversionData} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
