// src/pages/PositionEdit.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTenant, getCompanyIdByTenant } from "../utils/getTenant";

const PositionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    positionData: [
      { key: "", value: "" },
      { key: "", value: "" },
      { key: "", value: "" },
    ],
  });
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

        // Convert applicant object into key-value array
        const positionDataArray = Object.entries(data.applicant || {}).map(
          ([k, v]) => ({ key: k, value: v })
        );

        // Ensure 3 fixed pairs
        while (positionDataArray.length < 3) {
          positionDataArray.push({ key: "", value: "" });
        }

        setFormData({
          name: data.name || "",
          positionData: positionDataArray.slice(0, 3),
        });
      } catch (err) {
        console.error("Error fetching position:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosition();
  }, [id]);

  const handleKeyValueChange = (index, field, val) => {
    setFormData((prev) => {
      const newPositionData = [...prev.positionData];
      newPositionData[index][field] = val;
      return { ...prev, positionData: newPositionData };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate title & description pairing
    for (const pair of formData.positionData) {
      const keyFilled = pair.key.trim() !== "";
      const valueFilled = pair.value.trim() !== "";
      if (keyFilled !== valueFilled) {
        alert("Each Title must have a Description and each Description must have a Title.");
        return;
      }
    }

    // Build applicant object
    const applicantObj = {};
    formData.positionData.forEach((pair) => {
      if (pair.key.trim()) {
        applicantObj[pair.key.trim()] = pair.value.trim();
      }
    });

    try {
      const token = localStorage.getItem("token");
      const tenant = getTenant();
      const companyData = await getCompanyIdByTenant(token, tenant);
      const companyId = companyData?.companyByTenant?.company_id;

      const payload = {
        name: formData.name,
        applicant: applicantObj,
      };

      const res = await fetch(`/api/positions/company/${companyId}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update position");

      navigate("/positions");
    } catch (err) {
      alert(err.message || "Failed to update position");
    }
  };

  if (loading) return <div className="p-6">Loading position...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Position</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Position</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* 3 key-value pairs */}
        {formData.positionData.map((pair, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder={`Title ${index + 1}`}
              value={pair.key}
              onChange={(e) => handleKeyValueChange(index, "key", e.target.value)}
              className="border rounded px-3 py-2 flex-1"
            />
            <input
              type="text"
              placeholder={`Description ${index + 1}`}
              value={pair.value}
              onChange={(e) => handleKeyValueChange(index, "value", e.target.value)}
              className="border rounded px-3 py-2 flex-1"
            />
          </div>
        ))}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/positions")}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PositionEdit;
