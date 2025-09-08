import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ApplicantEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    position: "",
    picture: null,
    previewUrl: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch applicant");
        const data = await res.json();

        const imageRes = await fetch(`/api/images/employee/${id}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let previewUrl = null;
        if (imageRes.ok) {
          const blob = await imageRes.blob();
          previewUrl = URL.createObjectURL(blob);
        }

        setForm({
          name: data.name || "",
          position: data.position_id || "",
          picture: null,
          previewUrl,
        });
      } catch (err) {
        console.error("Error loading applicant:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        picture: file,
        previewUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("position_id", form.position);
    if (form.picture) formData.append("profile_picture", form.picture); // ✅ FIXED HERE

    const res = await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Update failed");

    alert("Applicant updated successfully");
    navigate("/applicants");
  } catch (err) {
    console.error("Update error:", err);
    alert("Failed to update applicant");
  }
};

  if (loading) return <div className="p-6">Loading applicant...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Applicant</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
          <div className="flex items-center gap-4">
            {form.previewUrl ? (
              <img
                src={form.previewUrl}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm border">
                No Image
              </div>
            )}

            <label className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
              Change Picture
              <input
                type="file"
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

        {/* Buttons */}
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
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicantEdit;
