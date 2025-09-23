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

// Dummy processed salaries
const processedSalaries = [
  {
    id: 1,
    employee: "John Doe",
    position: "Frontend Developer",
    month: "August 2025",
    baseSalary: 5000000,
    bonus: 500000,
    deductions: 200000,
    total: 5300000,
    paidAt: "2025-09-05",
  },
  {
    id: 2,
    employee: "Jane Miller",
    position: "Backend Developer",
    month: "August 2025",
    baseSalary: 6000000,
    bonus: 700000,
    deductions: 300000,
    total: 6400000,
    paidAt: "2025-09-06",
  },
];

// ✅ Rupiah formatter
const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export default function Payslips() {
  const tenant = getTenant();
  const [themeColors, setThemeColors] = useState(null); // start as null
  const [salaries] = useState(processedSalaries);

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
          setThemeColors(colorMap.red); // fallback if no theme
        }
      } catch (err) {
        console.error("Error fetching theme:", err);
        setThemeColors(colorMap.red); // fallback on error
      }
    };

    fetchTenantTheme();
  }, [tenant]);

  // Don't render until theme is ready
  if (!themeColors) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-400 animate-pulse">
          Loading Payslips...
        </h1>
      </div>
    );
  }

  const handleDownloadSlip = (salary) => {
    const slipContent = `
Payslip for ${salary.employee}
----------------------------
Employee: ${salary.employee}
Position: ${salary.position}
Month: ${salary.month}
Paid At: ${salary.paidAt}

Base Salary: ${formatRupiah(salary.baseSalary)}
Bonus: ${formatRupiah(salary.bonus)}
Deductions: ${formatRupiah(salary.deductions)}
----------------------------
Total Paid: ${formatRupiah(salary.total)}
    `;
    const blob = new Blob([slipContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Payslip_${salary.employee}_${salary.month}.txt`;
    link.click();
  };

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-6 ${themeColors.text}`}>
        Employee Payslips
      </h1>

      {salaries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left">Month</th>
                <th className="px-4 py-2 text-left">Total Paid</th>
                <th className="px-4 py-2 text-left">Paid At</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary) => (
                <tr
                  key={salary.id}
                  className={`border-b hover:${themeColors.bgLight} text-sm transition`}
                >
                  <td className="px-4 py-2">{salary.employee}</td>
                  <td className="px-4 py-2">{salary.position}</td>
                  <td className="px-4 py-2">{salary.month}</td>
                  <td className="px-4 py-2 font-medium">
                    {formatRupiah(salary.total)}
                  </td>
                  <td className="px-4 py-2">{salary.paidAt}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDownloadSlip(salary)}
                      className={`px-3 py-1 ${themeColors.bg} ${themeColors.text} ${themeColors.bgHover} rounded transition`}
                    >
                      Download Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No payslips available yet.</p>
      )}
    </div>
  );
}
