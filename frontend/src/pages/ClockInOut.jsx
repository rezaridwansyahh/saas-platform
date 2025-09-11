// src/pages/ClockInOut.jsx
import { useState } from "react";
console.log("ClockInOut page loaded");

const dummyEmployees = [
  { id: 1, name: "Alice Johnson", status: "Clocked In", time: "09:00 AM" },
  { id: 2, name: "Bob Smith", status: "Clocked Out", time: "05:00 PM" },
  { id: 3, name: "Charlie Brown", status: "Clocked In", time: "08:45 AM" },
  { id: 4, name: "David Lee", status: "Clocked Out", time: "06:10 PM" },
  { id: 5, name: "Eva Green", status: "Clocked In", time: "09:15 AM" },
  { id: 6, name: "Frank White", status: "Clocked Out", time: "04:55 PM" },
  { id: 7, name: "Grace Kim", status: "Clocked In", time: "08:30 AM" },
  { id: 8, name: "Henry Adams", status: "Clocked Out", time: "05:20 PM" },
  { id: 9, name: "Ivy Chen", status: "Clocked In", time: "09:10 AM" },
  { id: 10, name: "Jack Wilson", status: "Clocked Out", time: "05:40 PM" },
];

const ClockInOut = () => {
  const [employees] = useState(dummyEmployees);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Clock In / Out</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="border p-2">{emp.id}</td>
              <td className="border p-2">{emp.name}</td>
              <td
                className={`border p-2 font-medium ${
                  emp.status === "Clocked In" ? "text-green-600" : "text-red-600"
                }`}
              >
                {emp.status}
              </td>
              <td className="border p-2">{emp.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClockInOut;
