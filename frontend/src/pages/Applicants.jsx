import { useEffect, useState } from "react";
import {
  PlusCircle,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Upload,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getTenant, getCompanyIdByTenant } from "../utils/getTenant";
import ProfileImage from "../components/ProfileImage";

const LOCAL_STORAGE_KEY = "applicantFormDraft";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState(""); // new: position filter
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showModal, setShowModal] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [applicantToDelete, setApplicantToDelete] = useState(null);

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Add Applicant Form state
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  // Edit Applicant Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [applicantToEdit, setApplicantToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    position: "",
    photo: null,
  });
  const [editPhotoPreview, setEditPhotoPreview] = useState(null);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  //handle sort
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    setApplicants((prev) =>
      [...prev].sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];

        if (field === "position") {
          aVal =
            positions.find((pos) => pos.position_id === a.position)?.name || "";
          bVal =
            positions.find((pos) => pos.position_id === b.position)?.name || "";
        }

        if (aVal < bVal) return order === "asc" ? -1 : 1;
        if (aVal > bVal) return order === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const tenant = getTenant();
        const companyData = await getCompanyIdByTenant(token, tenant);
        const companyId = companyData?.companyByTenant?.company_id;

        if (!companyId) throw new Error("Company ID not found");

        // Fetch applicants
        const resApplicants = await fetch(
          `/api/employees/company/${companyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const dataApplicants = await resApplicants.json();
        const employees = dataApplicants.employeeByCompanyId || [];
        const formattedApplicants = Array.isArray(employees)
          ? employees.map((user) => ({
              id: user.employee_id,
              name: user.name,
              position: user.position_id,
            }))
          : [];
        setApplicants(formattedApplicants);

        // Fetch positions
        const resPositions = await fetch(
          `/api/positions/company/${companyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const dataPositions = await resPositions.json();
        const posArray = Array.isArray(dataPositions.positions)
          ? dataPositions.positions
          : [];
        setPositions(posArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Load saved draft when add modal opens
  useEffect(() => {
    if (showModal) {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData({
            name: parsed.name || "",
            position: parsed.position || "",
            photo: null,
          });
          setPhotoPreview(parsed.photoPreview || null);
        } catch {
          setFormData({ name: "", position: "", photo: null });
          setPhotoPreview(null);
        }
      } else {
        setFormData({ name: "", position: "", photo: null });
        setPhotoPreview(null);
      }
    }
  }, [showModal]);

  // Save draft helper for Add Modal
  // const saveDraftToLocalStorage = (data) => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  // };
  const saveDraftToLocalStorage = (data) => {
  try {
    const safeData = {
      name: data.name || "",
      position: data.position || "",
      photoName: data.photo ? data.photo.name : null,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(safeData));
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      console.warn("Quota exceeded. Clearing old draft...");
      // 🔹 Remove old draft and retry once
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      try {
        const safeData = {
          name: data.name || "",
          position: data.position || "",
          photoName: data.photo ? data.photo.name : null,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(safeData));
      } catch {
        console.error("Still failed to save draft after clearing.");
      }
    }
  }
};

  // Add Modal input handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      saveDraftToLocalStorage({
        name: updated.name,
        position: updated.position,
        photoPreview,
      });
      return updated;
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        setPhotoPreview(base64data);
        setFormData((prev) => {
          const updated = { ...prev, photo: file };
          saveDraftToLocalStorage({
            name: updated.name,
            position: updated.position,
            photoPreview: base64data,
          });
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Edit Modal input handlers
  const handleEditInputChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPhotoPreview(reader.result);
        setEditFormData((prev) => ({ ...prev, photo: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open edit modal and fill form
  const openEditModal = (applicant) => {
    setApplicantToEdit(applicant);
    setEditFormData({
      name: applicant.name || "",
      position: applicant.position || "",
      photo: null,
    });
    setEditPhotoPreview(null);
    setEditModalOpen(true);
  };

  // Add Modal submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting new applicant:", formData);

    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setFormData({ name: "", position: "", photo: null });
    setPhotoPreview(null);
    setShowModal(false);
  };

  // Edit Modal submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("Editing applicant:", editFormData);

    setEditModalOpen(false);
    setApplicantToEdit(null);
    setEditFormData({ name: "", position: "", photo: null });
    setEditPhotoPreview(null);
  };

  // Delete handler
  const handleDelete = async () => {
    if (!applicantToDelete) return;

    try {
      const token = localStorage.getItem("token");
      const tenant = getTenant();
      const companyData = await getCompanyIdByTenant(token, tenant);
      const companyId = companyData?.companyByTenant?.company_id;

      if (!companyId) throw new Error("Company ID not found");

      const response = await fetch(
        `/api/employees/${applicantToDelete.id}/company/${companyId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to delete applicant");

      setApplicants((prev) =>
        prev.filter((app) => app.id !== applicantToDelete.id)
      );
      setDeleteModalOpen(false);
      setApplicantToDelete(null);
    } catch (error) {
      alert(error.message || "Error deleting applicant");
    }
  };

  if (loading) return <div className="p-6">Loading applicants...</div>;

  // Filter + sort applicants
  const sortedApplicants = [...applicants]
    .filter((applicant) =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((applicant) =>
      positionFilter ? applicant.position === parseInt(positionFilter) : true
    )
    .sort((a, b) => {
      const aVal = a[sortBy]?.toString().toLowerCase();
      const bVal = b[sortBy]?.toString().toLowerCase();
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const paginatedApplicants = sortedApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
        <div className="p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Applicants</h1>
        <button
          onClick={() => {
            // ✅ Reset form when opening modal
            setFormData({ name: "", position: "", photo: null });
            setPhotoPreview(null);
            localStorage.removeItem(LOCAL_STORAGE_KEY); // clear draft too
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          <PlusCircle size={18} /> Add Applicant
        </button>
      </div>


      {/* Search + Position Filter */}
      <div className="mb-4 flex flex-col md:flex-row gap-2 md:items-center md:gap-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search applicants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200"
        />

        {/* Position filter dropdown */}
        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200"
        >
          <option value="">All Positions</option>
          {positions.map((pos) => (
            <option key={pos.position_id} value={pos.position_id}>
              {pos.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Picture</th>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-1">
                  Name
                  {sortBy === "name" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )
                  ) : (
                    <ChevronsUpDown size={14} />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("position")}
              >
                <div className="flex items-center gap-1">
                  Position
                  {sortBy === "position" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )
                  ) : (
                    <ChevronsUpDown size={14} />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedApplicants.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No applicants found.
                </td>
              </tr>
            ) : (
              paginatedApplicants.map((applicant, index) => (
                <tr
                  key={applicant.id}
                  className="border-t hover:bg-red-50 transition"
                >
                  <td className="px-6 py-3">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-3">
                    <ProfileImage
                      userId={applicant.id}
                      initial={applicant.name?.charAt(0).toUpperCase()}
                    />
                  </td>
                  <td className="px-6 py-3">
                    <Link
                      to={`/applicants/${applicant.id}`}
                      className="text-red-600 hover:underline"
                    >
                      {applicant.name}
                    </Link>
                  </td>
                  <td className="px-6 py-3">
                    {positions.find((pos) => pos.position_id === applicant.position)
                      ?.name || applicant.position}
                  </td>
                  <td className="px-6 py-3 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(applicant)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      aria-label={`Edit applicant ${applicant.name}`}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setApplicantToDelete(applicant);
                        setDeleteModalOpen(true);
                      }}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      aria-label={`Delete applicant ${applicant.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({
          length: Math.ceil(sortedApplicants.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Add Applicant Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold">Add New Applicant</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl p-1 leading-none cursor-pointer"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Profile photo upload */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full border overflow-hidden bg-gray-100">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Photo
                      </div>
                    )}
                  </div>
                  <label className="cursor-pointer flex items-center gap-2 text-sm text-blue-600 hover:underline">
                    <Upload size={16} /> Upload Photo
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 italic ml-1">
                  *Picture must be a JPEG or PNG file*
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Input your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Position dropdown */}
              {/* <div>
                <label className="block text-sm font-medium">Position</label>
                <select
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  className="w-full border rounded px-3 py-2 text-black"
                  required
                >
                  <option value="">Select a position</option>
                  {positions.map((pos) => (
                    // <option key={pos.position_id} value={pos.name}>
                    //   {pos.name}
                    // </option>

                    <option key={pos.position_id} value={pos.position_id}>
                      {pos.name}
                    </option>

                  ))}
                </select>
              </div> */}
              <div>
                <label className="block text-sm font-medium">Position</label>
                <select
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", parseInt(e.target.value))}
                  className="w-full border rounded px-3 py-2 text-black"
                  required
                >
                  <option value="">Select a position</option>
                  {positions.map((pos) => (
                    <option key={pos.position_id} value={pos.position_id}>
                      {pos.name}
                    </option>
                  ))}
                </select>
              </div>


              {/* Actions */}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Applicant Modal */}
      {editModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={() => setEditModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold">Edit Applicant</h2>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl p-1 leading-none cursor-pointer"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
              {/* Profile photo upload */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full border overflow-hidden bg-gray-100">
                    {editPhotoPreview ? (
                      <img
                        src={editPhotoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Photo
                      </div>
                    )}
                  </div>
                  <label className="cursor-pointer flex items-center gap-2 text-sm text-blue-600 hover:underline">
                    <Upload size={16} /> Upload Photo
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      onChange={handleEditFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 italic ml-1">
                  *Picture must be a JPEG or PNG file*
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Input your name"
                  value={editFormData.name}
                  onChange={(e) => handleEditInputChange("name", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Position dropdown */}
              <div>
                <label className="block text-sm font-medium">Position</label>
                <select
                  value={editFormData.position}
                  onChange={(e) =>
                    handleEditInputChange("position", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2 text-black"
                  required
                >
                  <option value="">Select a position</option>
                  {positions.map((pos) => (
                    // <option key={pos.position_id} value={pos.name}>
                    //   {pos.name}
                    // </option>

                    <option key={pos.position_id} value={pos.position_id}>
                      {pos.name}
                    </option>

                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
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
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={() => setDeleteModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete{" "}
              <strong>{applicantToDelete?.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
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
        </div>
      )}
    </div>
  );
};

export default Applicants;