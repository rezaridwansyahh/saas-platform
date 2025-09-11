import { useState } from "react";

const TimeReports = () => {
  const [reports, setReports] = useState([
    { id: 1, employee: "Alice Johnson", hours: 40 },
    { id: 2, employee: "Bob Smith", hours: 38 },
    { id: 3, employee: "Charlie Lee", hours: 42 },
    { id: 4, employee: "Diana Prince", hours: 36 },
    { id: 5, employee: "Ethan Brown", hours: 44 },
    { id: 6, employee: "Fiona Davis", hours: 41 },
    { id: 7, employee: "George Wilson", hours: 39 },
    { id: 8, employee: "Hannah Taylor", hours: 37 },
    { id: 9, employee: "Ian Miller", hours: 43 },
    { id: 10, employee: "Julia Anderson", hours: 40 },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Time Reports</h1>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Employee</th>
            <th className="p-2 border">Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id}>
              <td className="p-2 border">{r.employee}</td>
              <td className="p-2 border text-center">{r.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeReports;
