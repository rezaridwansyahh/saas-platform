// pages/BudgetPlanning.jsx
import { useState, useEffect } from "react";
import { getTenant } from "../utils/getTenant";
import { Bar, Doughnut } from "react-chartjs-2";
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

// Tailwind theme color map
const colorMap = {
  red: {
    bg: "bg-red-500",
    bgHover: "hover:bg-red-600",
    bgLight: "bg-red-50",
    text: "text-red-600",
    chartColor: "rgba(239, 68, 68, 0.7)",
  },
  purple: {
    bg: "bg-purple-500",
    bgHover: "hover:bg-purple-600",
    bgLight: "bg-purple-50",
    text: "text-purple-600",
    chartColor: "rgba(139, 92, 246, 0.7)",
  },
  blue: {
    bg: "bg-blue-500",
    bgHover: "hover:bg-blue-600",
    bgLight: "bg-blue-50",
    text: "text-blue-600",
    chartColor: "rgba(59, 130, 246, 0.7)",
  },
};

const BudgetPlanning = () => {
  const tenant = getTenant();
  const [themeColors, setThemeColors] = useState(null); // start as null

  // Currency formatter
  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  // Fetch tenant theme
  useEffect(() => {
    const fetchTenantTheme = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`http://${tenant}.localhost/api/companies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const tenantCompany = data.allEmployees.find(
          (c) => c.tenant_name === tenant
        );

        if (tenantCompany && tenantCompany.theme && colorMap[tenantCompany.theme]) {
          setThemeColors(colorMap[tenantCompany.theme]);
        } else {
          setThemeColors(colorMap.red); // fallback
        }
      } catch (err) {
        console.error("Error fetching theme:", err);
        setThemeColors(colorMap.red); // fallback
      }
    };

    fetchTenantTheme();
  }, [tenant]);

  // Prevent render until theme is ready
  if (!themeColors) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-400 animate-pulse">
          Loading Budget Planning...
        </h1>
      </div>
    );
  }

  // Sample Budget Data
  const expensesData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Expenses",
        data: [2000000, 3500000, 2500000, 4000000],
        backgroundColor: themeColors.chartColor,
      },
    ],
  };

  const allocationData = {
    labels: ["Recruitment", "Training", "Software", "Miscellaneous"],
    datasets: [
      {
        data: [5000000, 3000000, 2000000, 1000000],
        backgroundColor: [
          themeColors.chartColor,
          "#facc15",
          "#4ade80",
          "#60a5fa",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className={`text-3xl font-bold text-gray-800 mb-2 ${themeColors.text}`}>
        Budget Planning
      </h1>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`bg-white shadow rounded p-4 ${themeColors.bgLight}`}>
          <p className="text-sm text-gray-500">Total Budget</p>
          <h2 className={`text-xl font-semibold ${themeColors.text}`}>
            {formatRupiah(11000000)}
          </h2>
        </div>
        <div className={`bg-white shadow rounded p-4 ${themeColors.bgLight}`}>
          <p className="text-sm text-gray-500">Spent</p>
          <h2 className={`text-xl font-semibold ${themeColors.text}`}>
            {formatRupiah(7500000)}
          </h2>
        </div>
        <div className={`bg-white shadow rounded p-4 ${themeColors.bgLight}`}>
          <p className="text-sm text-gray-500">Remaining</p>
          <h2 className={`text-xl font-semibold ${themeColors.text}`}>
            {formatRupiah(3500000)}
          </h2>
        </div>
        <div className={`bg-white shadow rounded p-4 ${themeColors.bgLight}`}>
          <p className="text-sm text-gray-500">Efficiency Rate</p>
          <h2 className={`text-xl font-semibold ${themeColors.text}`}>85%</h2>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expenses Chart */}
        <div className="bg-white shadow rounded p-6">
          <h3 className={`text-lg font-semibold mb-4 ${themeColors.text}`}>
            Weekly Expenses
          </h3>
          <Bar
            data={expensesData}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `${context.dataset.label}: ${formatRupiah(context.raw)}`;
                    },
                  },
                },
              },
              scales: {
                y: {
                  ticks: {
                    callback: function (value) {
                      return formatRupiah(value);
                    },
                  },
                },
              },
            }}
          />
        </div>

        {/* Allocation Chart */}
        <div className="bg-white shadow rounded p-6">
          <h3 className={`text-lg font-semibold mb-4 ${themeColors.text}`}>
            Budget Allocation
          </h3>
          <Doughnut
            data={allocationData}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `${context.label}: ${formatRupiah(context.raw)}`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanning;

