// src/pages/applicants/ApplicantDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getTenant, getCompanyIdByTenant } from "../../utils/getTenant";

const ApplicantDetail = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tenant = getTenant();
    const companyId = getCompanyIdByTenant(tenant);

    if (!companyId) {
      console.error("Unknown tenant or subdomain:", tenant);
      setLoading(false);
      return;
    }

    fetch(`/api/employees/company/${companyId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (res) => {
        const text = await res.text();
        let data = [];

        try {
          data = JSON.parse(text);
        } catch (err) {
          throw new Error("Invalid JSON response");
        }

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch applicants");
        }

        const matched = data.find((emp) => emp.id.toString() === id || emp.employee_id?.toString() === id);
        setApplicant(matched || null);
      })
      .catch((err) => {
        console.error("Error fetching applicant:", err);
      })
      .finally(() => {
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
          {applicant.full_name || `${applicant.first_name || ""} ${applicant.last_name || ""}`}
        </h1>
        <p className="text-gray-600 mb-4">{applicant.email || "No email available"}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {applicant.phone || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Gender:</span>{" "}
              {applicant.gender || "N/A"}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Position:</span>{" "}
              {applicant.position_name || applicant.position || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {applicant.status || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
