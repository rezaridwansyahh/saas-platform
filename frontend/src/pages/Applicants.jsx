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

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [applicantToDelete, setApplicantToDelete] = useState(null);

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [formData, setFormData] = useState({ name: "", position: "", photo: null });
  const [photoPreview, setPhotoPreview] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [applicantToEdit, setApplicantToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", position: "", photo: null });
  const [editPhotoPreview, setEditPhotoPreview] = useState(null);

  const [themeColors, setThemeColors] = useState(colorMap.red); // default
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Fetch company theme
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const token = localStorage.getItem("token");
        const tenant = getTenant();
        const companyData = await getCompanyIdByTenant(token, tenant);
        const companyInfo = companyData?.companyByTenant;
        if (companyInfo) {
          const theme = companyInfo.theme || "red";
          setThemeColors(colorMap[theme]);
        }
      } catch (err) {
        console.error("Error fetching company theme:", err);
      }
    };
    fetchTheme();
  }, []);

  // Handle sorting
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    setApplicants((prev) =>
      [...prev].sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];

        if (field === "position") {
          aVal = positions.find((pos) => pos.position_id === a.position)?.name || "";
          bVal = positions.find((pos) => pos.position_id === b.position)?.name || "";
        }

        if (aVal < bVal) return order === "asc" ? -1 : 1;
        if (aVal > bVal) return order === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  // Fetch applicants and positions
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const tenant = getTenant();
        const companyData = await getCompanyIdByTenant(token, tenant);
        const companyId = companyData?.companyByTenant?.company_id;
        if (!companyId) throw new Error("Company ID not found");

        const resApplicants = await fetch(`/api/employees/company/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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

        const resPositions = await fetch(`/api/positions/company/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataPositions = await resPositions.json();
        setPositions(Array.isArray(dataPositions.positions) ? dataPositions.positions : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Draft saving for Add Modal
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
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        try {
          const safeData = {
            name: data.name || "",
            position: data.position || "",
            photoName: data.photo ? data.photo.name : null,
          };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(safeData));
        } catch {
          console.error("Still failed to save draft.");
        }
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      saveDraftToLocalStorage({ ...updated, photoPreview });
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
          saveDraftToLocalStorage({ ...updated, photoPreview: base64data });
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const openEditModal = (applicant) => {
    setApplicantToEdit(applicant);
    setEditFormData({ name: applicant.name || "", position: applicant.position || "", photo: null });
    setEditPhotoPreview(null);
    setEditModalOpen(true);
  };

  // Add/Edit/Delete submit handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setFormData({ name: "", position: "", photo: null });
    setPhotoPreview(null);
    setShowModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEditModalOpen(false);
    setApplicantToEdit(null);
    setEditFormData({ name: "", position: "", photo: null });
    setEditPhotoPreview(null);
  };

  const handleDelete = async () => {
    if (!applicantToDelete) return;
    try {
      const token = localStorage.getItem("token");
      const tenant = getTenant();
      const companyData = await getCompanyIdByTenant(token, tenant);
      const companyId = companyData?.companyByTenant?.company_id;
      if (!companyId) throw new Error("Company ID not found");

      const response = await fetch(`/api/employees/${applicantToDelete.id}/company/${companyId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete applicant");
      setApplicants((prev) => prev.filter((app) => app.id !== applicantToDelete.id));
      setDeleteModalOpen(false);
      setApplicantToDelete(null);
    } catch (error) {
      alert(error.message || "Error deleting applicant");
    }
  };

  if (loading) return <div className="p-6">Loading applicants...</div>;

  // Filter, sort & paginate
  const sortedApplicants = [...applicants]
    .filter((applicant) => applicant.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((applicant) => (positionFilter ? applicant.position === parseInt(positionFilter) : true))
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
            setFormData({ name: "", position: "", photo: null });
            setPhotoPreview(null);
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            setShowModal(true);
          }}
          className={`flex items-center gap-2 ${themeColors.bg} text-white px-4 py-2 rounded ${themeColors.hoverBg} transition`}
        >
          <PlusCircle size={18} /> Add Applicant
        </button>
      </div>

      <div className="mb-4 flex flex-col md:flex-row gap-2 md:items-center md:gap-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search applicants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full md:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-${themeColors.textLight.replace("text-", "")}`}
        />

        {/* Position filter dropdown */}
        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          className={`w-full md:w-1/4 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-${themeColors.textLight.replace("text-", "")}`}
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
                  className={`border-t hover:${themeColors.bgLight} transition`}
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
                  <td className={`px-6 py-3`}>
                    <Link
                      to={`/applicants/${applicant.id}`}
                      className={`${themeColors.text} hover:underline`}
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
                      className={`text-blue-600 hover:text-blue-800 cursor-pointer`}
                      aria-label={`Edit applicant ${applicant.name}`}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setApplicantToDelete(applicant);
                        setDeleteModalOpen(true);
                      }}
                      className={`${themeColors.text} hover:text-${themeColors.textLight.replace(
                        "text-",
                        ""
                      )} cursor-pointer`}
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
                ? `${themeColors.bg} text-white`
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

    </div>
  );
};

export default Applicants;
