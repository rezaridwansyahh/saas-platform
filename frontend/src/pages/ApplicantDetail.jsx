// src/pages/ApplicantDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

const ApplicantDetail = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setApplicant(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">Loading applicant...</div>;
  if (!applicant) return <div className="p-6">Applicant not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/applicants" className="flex items-center text-red-600 mb-4">
        <ArrowLeft className="mr-1" size={20} /> Back to Applicants
      </Link>

      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">
          {applicant.firstName} {applicant.lastName}
        </h1>
        <p className="text-gray-600 mb-4">{applicant.email}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><span className="font-semibold">Age:</span> {applicant.age}</p>
            <p><span className="font-semibold">Gender:</span> {applicant.gender}</p>
            <p><span className="font-semibold">Phone:</span> {applicant.phone}</p>
          </div>
          <div>
            <p><span className="font-semibold">Address:</span> {applicant.address?.address}</p>
            <p><span className="font-semibold">City:</span> {applicant.address?.city}</p>
            <p><span className="font-semibold">Company:</span> {applicant.company?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
