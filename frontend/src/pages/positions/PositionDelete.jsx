// src/pages/positions/PositionDelete.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTenant, getCompanyIdByTenant } from "../../utils/getTenant";

const PositionDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [positionName, setPositionName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const token = localStorage.getItem("token");
        const tenant = getTenant();
        const companyData = await getCompanyIdByTenant(token, tenant);
        const companyId = companyData?.companyByTenant?.company_id;

        const res = await fetch(`/api/positions/company/${companyId}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPositionName(data.name || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosition();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const tenant = getTenant();
      const companyData = await getCompanyIdByTenant(token, tenant);
      const companyId = companyData?.companyByTenant?.company_id;

      const res = await fetch(`/api/positions/company/${companyId}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete position");

      navigate("/positions");
    } catch (err) {
      alert(err.message || "Failed to delete position");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Delete Position</h1>
      <p className="mb-6">
        Are you sure you want to delete the position{" "}
        <span className="font-semibold">{positionName}</span>?
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => navigate("/positions")}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PositionDelete;
