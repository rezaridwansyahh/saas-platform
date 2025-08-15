import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { DndContext, useDroppable } from "@dnd-kit/core";
import ApplicantCard from "../components/ApplicantCard";

const stages = ["Applied", "Screening", "Interview", "Offer", "Hired"];

const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    location: "Remote",
    status: "Open",
    description: "We are looking for a skilled frontend developer...",
    applicants: [
      { id: "a1", name: "Alice", stage: "Applied" },
      { id: "a2", name: "Bob", stage: "Interview" },
    ],
  },
  {
    id: "2",
    title: "Backend Engineer",
    location: "Jakarta",
    status: "Interviewing",
    description: "Experienced backend engineer with Node.js expertise...",
    applicants: [
      { id: "b1", name: "Charlie", stage: "Interview" },
      { id: "b2", name: "Dana", stage: "Offer" },
    ],
  },
];

const JobDetail = () => {
  const { id } = useParams();
  const initialJob = mockJobs.find((job) => job.id === id);
  const [jobData, setJobData] = useState(initialJob);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedStage, setSelectedStage] = useState(stages[0]);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=20")
      .then((res) => res.json())
      .then((data) => setAvailableUsers(data.users));
  }, []);

  if (!jobData) {
    return <div className="p-6">Job not found.</div>;
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const draggedId = active.id;
    const newStage = over.id;

    const applicant = jobData.applicants.find((a) => a.id === draggedId);
    if (!applicant || applicant.stage === newStage) return;

    const updatedApplicants = jobData.applicants.map((a) =>
      a.id === draggedId ? { ...a, stage: newStage } : a
    );

    setJobData({ ...jobData, applicants: updatedApplicants });
  };

  const handleAddApplicant = () => {
    const selectedUser = availableUsers.find((user) => user.id === parseInt(selectedUserId));
    if (!selectedUser) return;

    const newApplicant = {
      id: `user-${selectedUser.id}`,
      name: `${selectedUser.firstName} ${selectedUser.lastName}`,
      stage: selectedStage,
    };

    setJobData({
      ...jobData,
      applicants: [...jobData.applicants, newApplicant],
    });

    setShowModal(false);
    setSelectedUserId("");
    setSelectedStage(stages[0]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{jobData.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        {jobData.location} • {jobData.status}
      </p>
      <p className="mb-6">{jobData.description}</p>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Applicant Pipeline</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          + Add from DummyJSON
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage) => {
            const applicantsInStage = jobData.applicants.filter(
              (applicant) => applicant.stage === stage
            );

            const { setNodeRef } = useDroppable({ id: stage });

            return (
              <div
                ref={setNodeRef}
                key={stage}
                className="bg-gray-50 p-3 rounded shadow-sm min-h-[100px]"
              >
                <h3 className="font-bold text-sm mb-2">{stage}</h3>
                <div className="space-y-2">
                  {applicantsInStage.length === 0 ? (
                    <p className="text-xs text-gray-400">No applicants</p>
                  ) : (
                    applicantsInStage.map((applicant) => (
                      <ApplicantCard
                        key={applicant.id}
                        id={applicant.id}
                        name={applicant.name}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DndContext>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Applicant</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Select User
              </label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Select User --</option>
                {availableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                Select Stage
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddApplicant}
                disabled={!selectedUserId}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
