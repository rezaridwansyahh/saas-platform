import { useState } from "react";

// Dummy processed salaries (in a real app you’d fetch this from API)
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
  const [salaries] = useState(processedSalaries);

  const handleDownloadSlip = (salary) => {
    // Generate payslip content in plain text with Rupiah
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
      <h1 className="text-2xl font-bold mb-6">Employee Payslips</h1>

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
                  className="border-b hover:bg-gray-50 text-sm"
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
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
