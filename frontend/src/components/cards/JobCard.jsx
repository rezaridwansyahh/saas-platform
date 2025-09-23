// import { Link } from "react-router-dom";

// const JobCard = ({job}) => {
//     return (
//     <Link to={`/jobs/${job.id}`}>
//       <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer">
//         <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
//         <p className="text-sm text-gray-600 mb-2">{job.location}</p>
//         <div className="text-sm text-gray-500">
//           <span className="mr-4">{job.applicants} Applicants</span>
//           <span>Status: {job.status}</span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default JobCard;


import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  if (!job) return null;

  const { id, title = "Untitled Job", location = "Unknown", applicants = 0, status = "N/A" } = job;

  return (
    <Link to={`/jobs/${id}`} aria-label={`View job ${title}`}>
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer h-full flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{location}</p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{applicants} Applicants</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === "Open"
                ? "bg-green-100 text-green-700"
                : status === "Closed"
                ? "bg-red-100 text-red-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
