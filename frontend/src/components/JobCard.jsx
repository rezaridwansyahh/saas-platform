import { Link } from "react-router-dom";

const JobCard = ({job}) => {
    return (
    <Link to={`/jobs/${job.id}`}>
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer">
        <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{job.location}</p>
        <div className="text-sm text-gray-500">
          <span className="mr-4">{job.applicants} Applicants</span>
          <span>Status: {job.status}</span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;