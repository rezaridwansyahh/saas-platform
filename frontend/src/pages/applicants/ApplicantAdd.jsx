// src/pages/applicants/ApplicantAdd.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTenant, getCompanyIdByTenant } from "../../utils/getTenant";

// Tenant color map
const colorMap = {
  red: {
    text: "text-red-700",
    textLight: "text-red-500",
    bg: "bg-red-600",
    bgLight: "bg-red-100",
    border: "border-red-600",
    hoverBg: "hover:bg-red-700",
  },
  purple: {
    text: "text-purple-700",
    textLight: "text-purple-500",
    bg: "bg-purple-600",
    bgLight: "bg-purple-100",
    border: "border-purple-600",
    hoverBg: "hover:bg-purple-700",
  },
  blue: {
    text: "text-blue-700",
    textLight: "text-blue-500",
    bg: "bg-blue-600",
    bgLight: "bg-blue-100",
    border: "border-blue-600",
    hoverBg: "hover:bg-blue-700",
  },
};

const ApplicantAdd = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", position: "" });
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);
  const [themeColors, setThemeColors] = useState(colorMap.red); // default

  // Fetch company info and theme
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const tenant = getTenant();
        const companyData = await getCompanyIdByTenant(token, tenant);
        const companyInfo = companyData?.companyByTenant;
        if (companyInfo) {
          setCompany(companyInfo);
          const theme = companyInfo.theme || "red";
          setThemeColors(colorMap[theme]);
        }
      } catch (err) {
        console.error("Error fetching company theme:", err);
      }
    };
    fetchCompany();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const tenant = getTenant();
      const companyData = await getCompanyIdByTenant(token, tenant);
      const companyId = companyData?.companyByTenant?.company_id;

      if (!companyId) throw new Error("Company ID not found");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("position_id", form.position);
      formData.append("company_id", companyId);
      if (picture) formData.append("profile_picture", picture);

      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to add applicant. Server says: ${errorText}`);
      }

      alert("Applicant added successfully");
      navigate("/applicants");
    } catch (err) {
      console.error("Add applicant error:", err);
      alert("Failed to add applicant. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className={`text-2xl font-bold mb-4 ${themeColors.text}`}>
        Add New Applicant
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {/* Profile Picture Upload */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${themeColors.text}`}
          >
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm border">
                No Image
              </div>
            )}
            <label
              className={`cursor-pointer ${themeColors.bg} text-white px-4 py-2 rounded ${themeColors.hoverBg} transition`}
            >
              Choose File
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Name */}
        <div>
          <label
            className={`block text-sm font-medium ${themeColors.text}`}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded shadow-sm"
          />
        </div>

        {/* Position ID */}
        <div>
          <label
            className={`block text-sm font-medium ${themeColors.text}`}
          >
            Position ID
          </label>
          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded shadow-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/applicants")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 ${themeColors.bg} text-white rounded ${themeColors.hoverBg} transition`}
          >
            {loading ? "Adding..." : "Add Applicant"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicantAdd;
