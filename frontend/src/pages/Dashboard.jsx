import JobCard from "../components/JobCard";

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Remote",
    applicants: 12,
    status: "Open",
  },
  {
    id: 2,
    title: "Backend Engineer",
    location: "Jakarta",
    applicants: 7,
    status: "Interviewing",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    location: "Bandung",
    applicants: 5,
    status: "Closed",
  },
];

function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Job Openings</h1>
          <p className="text-gray-500 text-sm mt-1">
            {mockJobs.length} jobs listed
          </p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
          + Add Job
        </button>
      </div>

      {/* Job Cards */}
      {mockJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map((job, index) => (
            <div
              key={job.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-10 border rounded">
          No jobs available. Click "Add Job" to get started.
        </div>
      )}
    </div>
  );
}

export default Dashboard;

