import { useState } from "react";

// Dummy data
const initialInterviews = [
  {
    id: 1,
    candidate: "John Doe",
    position: "Frontend Developer",
    type: "Video Call",
    interviewer: "Alice Smith",
    date: "2025-09-12",
    time: "10:00 AM",
    status: "Scheduled",
  },
  {
    id: 2,
    candidate: "Jane Miller",
    position: "Backend Developer",
    type: "On-site",
    interviewer: "Michael Brown",
    date: "2025-09-13",
    time: "02:30 PM",
    status: "Completed",
  },
];

export default function Interviews() {
  const [interviews, setInterviews] = useState(initialInterviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    candidate: "",
    position: "",
    type: "Phone",
    interviewer: "",
    date: "",
    time: "",
    status: "Scheduled",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInterview = { id: Date.now(), ...formData };
    setInterviews([...interviews, newInterview]);
    setFormData({
      candidate: "",
      position: "",
      type: "Phone",
      interviewer: "",
      date: "",
      time: "",
      status: "Scheduled",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Interviews</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Schedule Interview
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-4 py-2 text-left">Candidate</th>
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Interviewer</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => (
              <tr
                key={interview.id}
                className="border-b hover:bg-gray-50 text-sm"
              >
                <td className="px-4 py-2">{interview.candidate}</td>
                <td className="px-4 py-2">{interview.position}</td>
                <td className="px-4 py-2">{interview.type}</td>
                <td className="px-4 py-2">{interview.interviewer}</td>
                <td className="px-4 py-2">{interview.date}</td>
                <td className="px-4 py-2">{interview.time}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      interview.status === "Scheduled"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {interview.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Schedule Interview</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="candidate"
                placeholder="Candidate Name"
                value={formData.candidate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option>Phone</option>
                <option>Video Call</option>
                <option>On-site</option>
              </select>
              <input
                type="text"
                name="interviewer"
                placeholder="Interviewer"
                value={formData.interviewer}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="flex-1 border p-2 rounded"
                  required
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="flex-1 border p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
