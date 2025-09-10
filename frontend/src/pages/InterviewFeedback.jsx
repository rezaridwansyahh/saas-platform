import { useState } from "react";

// Dummy completed interviews
const completedInterviews = [
  {
    id: 1,
    candidate: "John Doe",
    position: "Frontend Developer",
    interviewer: "Alice Smith",
    date: "2025-09-12",
    status: "Pending Feedback",
  },
  {
    id: 2,
    candidate: "Jane Miller",
    position: "Backend Developer",
    interviewer: "Michael Brown",
    date: "2025-09-13",
    status: "Pending Feedback",
  },
];

export default function InterviewFeedback() {
  const [pending, setPending] = useState(completedInterviews);
  const [submitted, setSubmitted] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [formData, setFormData] = useState({
    technical: 3,
    communication: 3,
    problemSolving: 3,
    culturalFit: 3,
    recommendation: "Neutral",
    comments: "",
  });

  const handleOpenModal = (interview) => {
    setCurrentInterview(interview);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedback = {
      id: Date.now(),
      ...currentInterview,
      ...formData,
      status: "Submitted",
    };

    setSubmitted([...submitted, feedback]);
    setPending(pending.filter((i) => i.id !== currentInterview.id));
    setIsModalOpen(false);

    // Reset form
    setFormData({
      technical: 3,
      communication: 3,
      problemSolving: 3,
      culturalFit: 3,
      recommendation: "Neutral",
      comments: "",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Interview Feedback</h1>

      {/* Pending Feedback */}
      <h2 className="text-lg font-semibold mb-3">Pending Feedback</h2>
      {pending.length > 0 ? (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Candidate</th>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left">Interviewer</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((interview) => (
                <tr key={interview.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{interview.candidate}</td>
                  <td className="px-4 py-2">{interview.position}</td>
                  <td className="px-4 py-2">{interview.interviewer}</td>
                  <td className="px-4 py-2">{interview.date}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleOpenModal(interview)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Give Feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mb-8 text-gray-500">No pending feedback 🎉</p>
      )}

      {/* Submitted Feedback */}
      <h2 className="text-lg font-semibold mb-3">Submitted Feedback</h2>
      {submitted.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Candidate</th>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left">Interviewer</th>
                <th className="px-4 py-2 text-left">Recommendation</th>
                <th className="px-4 py-2 text-left">Comments</th>
              </tr>
            </thead>
            <tbody>
              {submitted.map((fb) => (
                <tr key={fb.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="px-4 py-2">{fb.candidate}</td>
                  <td className="px-4 py-2">{fb.position}</td>
                  <td className="px-4 py-2">{fb.interviewer}</td>
                  <td className="px-4 py-2 font-medium">{fb.recommendation}</td>
                  <td className="px-4 py-2">{fb.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No feedback submitted yet.</p>
      )}

      {/* Feedback Modal */}
      {isModalOpen && currentInterview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              Feedback for {currentInterview.candidate}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Ratings */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col text-sm">
                  Technical Skills
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      name="technical"
                      value={formData.technical}
                      onChange={handleChange}
                    />
                    <span className="w-6 text-center">{formData.technical}</span>
                  </div>
                </label>

                <label className="flex flex-col text-sm">
                  Communication
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      name="communication"
                      value={formData.communication}
                      onChange={handleChange}
                    />
                    <span className="w-6 text-center">{formData.communication}</span>
                  </div>
                </label>

                <label className="flex flex-col text-sm">
                  Problem Solving
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      name="problemSolving"
                      value={formData.problemSolving}
                      onChange={handleChange}
                    />
                    <span className="w-6 text-center">{formData.problemSolving}</span>
                  </div>
                </label>

                <label className="flex flex-col text-sm">
                  Cultural Fit
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      name="culturalFit"
                      value={formData.culturalFit}
                      onChange={handleChange}
                    />
                    <span className="w-6 text-center">{formData.culturalFit}</span>
                  </div>
                </label>
              </div>


              {/* Recommendation */}
              <label className="block text-sm">
                Recommendation
                <select
                  name="recommendation"
                  value={formData.recommendation}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                >
                  <option>Strong Hire</option>
                  <option>Hire</option>
                  <option>Neutral</option>
                  <option>No Hire</option>
                </select>
              </label>

              {/* Comments */}
              <textarea
                name="comments"
                placeholder="Additional comments..."
                value={formData.comments}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows={3}
              />

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
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
