// import JobCard from "../components/JobCard";

// const mockJobs = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     location: "Remote",
//     applicants: 12,
//     status: "Open",
//   },
//   {
//     id: 2,
//     title: "Backend Engineer",
//     location: "Jakarta",
//     applicants: 7,
//     status: "Interviewing",
//   },
//   {
//     id: 3,
//     title: "UI/UX Designer",
//     location: "Bandung",
//     applicants: 5,
//     status: "Closed",
//   },
// ];

// function Dashboard() {
//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Job Openings</h1>
//           <p className="text-gray-500 text-sm mt-1">
//             {mockJobs.length} jobs listed
//           </p>
//         </div>
//         <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
//           + Add Job
//         </button>
//       </div>

//       {/* Job Cards */}
//       {mockJobs.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {mockJobs.map((job, index) => (
//             <div
//               key={job.id}
//               className="animate-fadeIn"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <JobCard job={job} />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-gray-500 text-center py-10 border rounded">
//           No jobs available. Click "Add Job" to get started.
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;


import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 text-gray-800">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Jobs Open" value="74" />
        <DashboardCard title="Ongoing Test Taker" value="21" />
        <DashboardCard title="Candidate Pool" value="2647" />
        <DashboardCard title="Test Completion Rate" value="30.4%" />
      </div>

      {/* Company Profile + Create Job/Test */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 p-6 bg-white rounded shadow">
          <h2 className="text-lg font-bold text-red-700 mb-2">Company Profile</h2>
          <p className="mb-4 text-sm">Company profile sudah lengkap</p>
          <div className="w-full bg-red-100 h-2 rounded mb-4">
            <div className="h-full bg-red-600 w-full rounded"></div>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-red-600 text-white rounded">View Page</button>
            <button className="px-4 py-2 border border-red-600 text-red-600 rounded">Edit Page</button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-6 bg-white rounded shadow flex flex-col justify-between">
            <h3 className="text-red-700 font-semibold mb-2">Create Job</h3>
            <p className="text-sm text-gray-600 mb-4">Buat lowongan untuk mulai mendapatkan kandidat.</p>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded">+ Create Job</button>
          </div>

          <div className="p-6 bg-white rounded shadow flex flex-col justify-between">
            <h3 className="text-red-700 font-semibold mb-2">Create Test</h3>
            <p className="text-sm text-gray-600 mb-4">Buat tes sebagai bagian dari seleksi lowongan ataupun sebagai tes terpisah.</p>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded">+ Create Test</button>
          </div>
        </div>
      </div>

      {/* Job and Test Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Jobs */}
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-red-700">My Jobs</h3>
            <a href="#" className="text-sm text-red-500 hover:underline">View all (898)</a>
          </div>
          <ul className="text-sm space-y-3">
            <li className="flex justify-between">
              <span>tes 1</span>
              <span className="text-green-600 font-medium">Open</span>
            </li>
            <li className="flex justify-between">
              <span>test 2</span>
              <span className="text-red-600 font-medium">Closed</span>
            </li>
            <li className="flex justify-between">
              <span>test 3</span>
              <span className="text-yellow-500 font-medium">Drafted</span>
            </li>
          </ul>
        </div>

        {/* My Tests */}
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-red-700">My Test</h3>
            <a href="#" className="text-sm text-red-500 hover:underline">View all (4254)</a>
          </div>
          <ul className="text-sm space-y-4">
            <li>
              <p className="font-medium">tes tkb</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Finished • 1 Person</span>
                <span className="text-xs">100%</span>
              </div>
              <div className="w-full bg-red-100 h-2 rounded mt-1">
                <div className="h-full bg-red-600 w-full rounded"></div>
              </div>
            </li>
            <li>
              <p className="font-medium">TEST LA</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Started • 1 Person</span>
                <span className="text-xs">100%</span>
              </div>
              <div className="w-full bg-red-100 h-2 rounded mt-1">
                <div className="h-full bg-red-600 w-full rounded"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
