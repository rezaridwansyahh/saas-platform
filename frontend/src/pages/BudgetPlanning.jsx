// pages/BudgetPlanning.jsx
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

const BudgetPlanning = () => {
  // ✅ Currency formatter for Rupiah
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // ✅ Sample Budget Data
  const expensesData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Expenses",
        data: [2000000, 3500000, 2500000, 4000000],
        backgroundColor: "rgba(239, 68, 68, 0.7)",
      },
    ],
  };

  const allocationData = {
    labels: ["Recruitment", "Training", "Software", "Miscellaneous"],
    datasets: [
      {
        data: [5000000, 3000000, 2000000, 1000000],
        backgroundColor: ["#f87171", "#facc15", "#4ade80", "#60a5fa"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Budget Planning</h1>
      {/* <p className="text-gray-600 mb-6"></p> */}

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Total Budget</p>
          <h2 className="text-xl font-semibold text-red-600">{formatRupiah(11000000)}</h2>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Spent</p>
          <h2 className="text-xl font-semibold text-red-600">{formatRupiah(7500000)}</h2>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Remaining</p>
          <h2 className="text-xl font-semibold text-red-600">{formatRupiah(3500000)}</h2>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Efficiency Rate</p>
          <h2 className="text-xl font-semibold text-red-600">85%</h2>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expenses Chart */}
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Weekly Expenses</h3>
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
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Budget Allocation</h3>
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
