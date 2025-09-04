import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTenant, getCompanyIdByTenant } from "../utils/getTenant";

const ApplicantAdd = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", position: "" });
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
      console.log(form.name);
      formData.append("position_id", form.position);
      formData.append("company_id", companyId);
      if (picture) formData.append("profile_picture", picture); 

      // Debug log: FormData values
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }
      console.log(formData);
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      <h1 className="text-2xl font-bold mb-4">Add New Applicant</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Profile Picture Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
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
            <label className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
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
          <label className="block text-sm font-medium text-gray-700">Name</label>
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
          <label className="block text-sm font-medium text-gray-700">Position ID</label>
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
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {loading ? "Adding..." : "Add Applicant"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicantAdd;

