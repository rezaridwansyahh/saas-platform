import { useEffect, useState } from "react";
import { PlusCircle, X, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    extra1: "",
    extra2: ""
  });

  const [sortKey, setSortKey] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock userCompany
  const userCompany = {
    name: "ABC Corp",
    tier: "Corporate" // change to 'Basic', 'Pro', or 'Corporate'
  };

  const tierStyles = {
    Basic: "bg-gray-200 text-gray-800",
    Pro: "bg-yellow-200 text-yellow-800",
    Corporate: "bg-green-200 text-green-800",
  };

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [applicantToDelete, setApplicantToDelete] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=30")
      .then((res) => res.json())
      .then((data) => {
        const dataWithPosition = data.users.map((user) => ({
          ...user,
          position: user.position || "",
        }));
        setApplicants(dataWithPosition);
        setLoading(false);
      });
  }, []);

  const confirmDelete = (applicant) => {
    setApplicantToDelete(applicant);
    setShowConfirmDelete(true);
  };

  const handleDeleteConfirmed = () => {
    setApplicants((prev) => prev.filter((a) => a.id !== applicantToDelete.id));
    setShowConfirmDelete(false);
    setApplicantToDelete(null);
  };

  const handleEdit = (applicant) => {
    setFormData({ ...formData, ...applicant });
    setShowModal(true);
  };

  const handleAdd = () => {
    setFormData({ id: null, firstName: "", lastName: "", email: "", position: "", extra1: "", extra2: "" });
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      setApplicants((prev) =>
        prev.map((a) => (a.id === formData.id ? formData : a))
      );
    } else {
      const newApplicant = {
        ...formData,
        id: Date.now(),
      };
      setApplicants((prev) => [...prev, newApplicant]);
    }

    setShowModal(false);
  };

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredApplicants = applicants.filter((applicant) => {
    const fullName = `${applicant.firstName} ${applicant.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedApplicants = [...filteredApplicants].sort((a, b) => {
    const aVal = a[sortKey]?.toLowerCase?.() || "";
    const bVal = b[sortKey]?.toLowerCase?.() || "";
    return sortOrder === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const totalPages = Math.ceil(sortedApplicants.length / itemsPerPage);
  const paginatedApplicants = sortedApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div className="p-6">Loading applicants...</div>;

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-800">Applicants</h1>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${tierStyles[userCompany.tier]}`}>
            {userCompany.tier} Tier
          </span>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          <PlusCircle size={18} /> Add Applicant
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search applicants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Position</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApplicants.map((applicant, index) => (
              <tr
                key={applicant.id}
                className="border-t hover:bg-red-50 transition duration-150"
              >
                <td className="px-6 py-3">{(currentPage - 1) * 10 + index + 1}</td>
                <td className="px-6 py-3">
                  <Link
                    to={`/applicants/${applicant.id}`}
                    className="text-red-600 hover:underline"
                  >
                    {applicant.firstName} {applicant.lastName}
                  </Link>
                </td>
                <td className="px-6 py-3">{applicant.email}</td>
                <td className="px-6 py-3">{applicant.position || "-"}</td>
                <td className="px-6 py-3 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(applicant)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => confirmDelete(applicant)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
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

      {/* Modal: Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-6 rounded-md shadow-xl w-full max-w-md relative"
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {formData.id ? "Edit Applicant" : "Add New Applicant"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>
              {userCompany.tier !== "Basic" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                </div>
              )}
              {userCompany.tier === "Pro" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Extra Field</label>
                  <input
                    type="text"
                    value={formData.extra1}
                    onChange={(e) =>
                      setFormData({ ...formData, extra1: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                </div>
              )}
              {userCompany.tier === "Corporate" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Extra Corporate Field</label>
                  <input
                    type="text"
                    value={formData.extra2}
                    onChange={(e) =>
                      setFormData({ ...formData, extra2: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                {formData.id ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete <strong>{applicantToDelete.firstName} {applicantToDelete.lastName}</strong>?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
