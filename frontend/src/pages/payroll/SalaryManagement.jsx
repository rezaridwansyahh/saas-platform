// src/pages/payroll/Payslips.jsx
import { useState, useEffect } from "react";
import { getTenant } from "../../utils/getTenant";

// Tailwind theme color map
const colorMap = {
  red: {
    bg: "bg-red-500",
    bgHover: "hover:bg-red-600",
    bgLight: "bg-red-50",
    text: "text-white",
  },
  purple: {
    bg: "bg-purple-500",
    bgHover: "hover:bg-purple-600",
    bgLight: "bg-purple-50",
    text: "text-white",
  },
  blue: {
    bg: "bg-blue-500",
    bgHover: "hover:bg-blue-600",
    bgLight: "bg-blue-50",
    text: "text-white",
  },
};

// Dummy data
const pendingSalaries = [
  {
    id: 1,
    employee: "John Doe",
    position: "Frontend Developer",
    baseSalary: 5000000,
    bonus: 500000,
    deductions: 200000,
    month: "August 2025",
  },
  {
    id: 2,
    employee: "Jane Miller",
    position: "Backend Developer",
    baseSalary: 6000000,
    bonus: 700000,
    deductions: 300000,
    month: "August 2025",
  },
];

// ✅ Rupiah formatter
const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export default function SalaryManagement() {
  const tenant = getTenant(); 
  const [themeColors, setThemeColors] = useState(null); // start as null
  const [pending, setPending] = useState(pendingSalaries);
  const [processed, setProcessed] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSalary, setCurrentSalary] = useState(null);

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

  // Prevent rendering until theme is ready
  if (!themeColors) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-400 animate-pulse">
          Loading Salary Management...
        </h1>
      </div>
    );
  }

  const handleOpenModal = (salary) => {
    setCurrentSalary(salary);
    setIsModalOpen(true);
  };

  const handleProcessSalary = () => {
    const processedSalary = {
      ...currentSalary,
      status: "Paid",
      total: currentSalary.baseSalary + currentSalary.bonus - currentSalary.deductions,
      paidAt: new Date().toLocaleDateString(),
    };

    setProcessed([...processed, processedSalary]);
    setPending(pending.filter((s) => s.id !== currentSalary.id));
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-6 ${themeColors.text}`}>Salary Management</h1>

      {/* Pending Salaries */}
      <h2 className={`text-lg font-semibold mb-3 ${themeColors.text}`}>Pending Salaries</h2>
      {pending.length > 0 ? (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left">Month</th>
                <th className="px-4 py-2 text-left">Base Salary</th>
                <th className="px-4 py-2 text-left">Bonus</th>
                <th className="px-4 py-2 text-left">Deductions</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((salary) => (
                <tr
                  key={salary.id}
                  className={`border-b hover:${themeColors.bgLight} transition`}
                >
                  <td className="px-4 py-2">{salary.employee}</td>
                  <td className="px-4 py-2">{salary.position}</td>
                  <td className="px-4 py-2">{salary.month}</td>
                  <td className="px-4 py-2">{formatRupiah(salary.baseSalary)}</td>
                  <td className="px-4 py-2">{formatRupiah(salary.bonus)}</td>
                  <td className="px-4 py-2">{formatRupiah(salary.deductions)}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleOpenModal(salary)}
                      className={`px-3 py-1 ${themeColors.bg} ${themeColors.text} ${themeColors.bgHover} rounded transition`}
                    >
                      Process Salary
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mb-8 text-gray-500">No pending salaries 🎉</p>
      )}

      {/* Processed Salaries */}
      <h2 className={`text-lg font-semibold mb-3 ${themeColors.text}`}>Processed Salaries</h2>
      {processed.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left">Month</th>
                <th className="px-4 py-2 text-left">Total Paid</th>
                <th className="px-4 py-2 text-left">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {processed.map((s) => (
                <tr
                  key={s.id}
                  className={`border-b hover:${themeColors.bgLight} text-sm transition`}
                >
                  <td className="px-4 py-2">{s.employee}</td>
                  <td className="px-4 py-2">{s.position}</td>
                  <td className="px-4 py-2">{s.month}</td>
                  <td className="px-4 py-2 font-medium">{formatRupiah(s.total)}</td>
                  <td className="px-4 py-2">{s.paidAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No salaries processed yet.</p>
      )}

      {/* Process Salary Modal */}
      {isModalOpen && currentSalary && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Confirm Salary for {currentSalary.employee}
            </h2>
            <p>
              <strong>Base Salary:</strong> {formatRupiah(currentSalary.baseSalary)}
            </p>
            <p>
              <strong>Bonus:</strong> {formatRupiah(currentSalary.bonus)}
            </p>
            <p>
              <strong>Deductions:</strong> {formatRupiah(currentSalary.deductions)}
            </p>
            <p className="mt-2 text-lg font-semibold">
              Total:{" "}
              {formatRupiah(
                currentSalary.baseSalary + currentSalary.bonus - currentSalary.deductions
              )}
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleProcessSalary}
                className={`px-4 py-2 rounded ${themeColors.bg} ${themeColors.text} ${themeColors.bgHover} transition`}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
