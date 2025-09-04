import { useEffect, useState, useRef } from "react";
import {
  PlusCircle,
  Edit,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  X,
  Trash2,
} from "lucide-react";
import { getTenant, getCompanyIdByTenant } from "../utils/getTenant";
import { useTheme } from "../context/ThemeContext"; // ✅ Import useTheme

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [editPosition, setEditPosition] = useState(null);
  const [deletePosition, setDeletePosition] = useState(null);

  // ✅ Get theme from context
  const { theme, loading: themeLoading } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    positionData: [
      { key: "", value: "" },
      { key: "", value: "" },
      { key: "", value: "" },
    ],
  });

  const itemsPerPage = 10;
  const modalRef = useRef(null);

  // ✅ Helper function to generate lighter version of theme color
  const getLighterColor = (color, opacity = 0.1) => {
    // Convert hex to rgba with opacity for hover effects
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // ✅ Helper function to generate darker version of theme color
  const getDarkerColor = (color, factor = 0.8) => {
    const hex = color.replace('#', '');
    const r = Math.floor(parseInt(hex.substr(0, 2), 16) * factor);
    const g = Math.floor(parseInt(hex.substr(2, 2), 16) * factor);
    const b = Math.floor(parseInt(hex.substr(4, 2), 16) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    const fetchPositions = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const tenant = getTenant();
        const companyData = await getCompanyIdByTenant(token, tenant);
        const companyId = companyData?.companyByTenant?.company_id;

        if (!companyId) throw new Error("Company ID not found");

        const response = await fetch(`/api/positions/company/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setPositions(Array.isArray(data.positions) ? data.positions : []);
      } catch (error) {
        console.error("Error fetching positions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  // Close modal if click outside modal content (for all modals)
  useEffect(() => {
    if (!showModal && !editPosition && !deletePosition) return;

    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setShowModal(false);
        setEditPosition(null);
        setDeletePosition(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, editPosition, deletePosition]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const filteredPositions = positions.filter((pos) =>
    pos.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPositions = [...filteredPositions].sort((a, b) => {
    const aVal = a[sortBy]?.toString().toLowerCase();
    const bVal = b[sortBy]?.toString().toLowerCase();
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedPositions = sortedPositions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle form changes for both Add and Edit forms
  const handleKeyValueChange = (index, field, val, isEdit = false) => {
    if (isEdit) {
      setEditPosition((prev) => {
        const newPositionData = [...prev.applicantData];
        newPositionData[index][field] = val;
        return { ...prev, applicantData: newPositionData };
      });
    } else {
      setFormData((prev) => {
        const newPositionData = [...prev.positionData];
        newPositionData[index][field] = val;
        return { ...prev, positionData: newPositionData };
      });
    }
  };

  // Add Position Submit (already implemented)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate pairs: title & description must be filled together or both empty
    for (const pair of formData.positionData) {
      const keyFilled = pair.key.trim() !== "";
      const valueFilled = pair.value.trim() !== "";
      if (keyFilled !== valueFilled) {
        alert(
          "Each Title must have a Description and each Description must have a Title. Please fill or clear both."
        );
        return;
      }
    }

    const positionObj = {};
    formData.positionData.forEach((pair) => {
      const key = pair.key.trim();
      const value = pair.value.trim();
      if (key !== "") {
        positionObj[key] = value;
      }
    });

    try {
      const token = localStorage.getItem("token");
      const tenant = getTenant();
      const companyData = await getCompanyIdByTenant(token, tenant);
      const companyId = companyData?.companyByTenant?.company_id;

      if (!companyId) throw new Error("Company ID not found");

      const payload = {
        name: formData.name,
        applicant: positionObj,
      };

      const response = await fetch(`/api/positions/company/${companyId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to add position");

      const newPosition = await response.json();

      setPositions((prev) => [...prev, newPosition]);
      setFormData({
        name: "",
        positionData: [
          { key: "", value: "" },
          { key: "", value: "" },
          { key: "", value: "" },
        ],
      });
      setShowModal(false);
    } catch (error) {
      alert(error.message || "Failed to add position");
    }
  };

  // --- EDIT MODAL HANDLERS ---

  const openEditModal = (pos) => {
    // Convert applicant object to array of key-value pairs (max 3, or fill empty)
    const applicantEntries = Object.entries(pos.applicant || {}).slice(0, 3);
    while (applicantEntries.length < 3) {
      applicantEntries.push(["", ""]);
    }

    setEditPosition({
      id: pos.id,
      name: pos.name,
      applicantData: applicantEntries.map(([key, value]) => ({
        key,
        value,
      })),
    });
  };

  const handleEditInputChange = (field, val) => {
    setEditPosition((prev) => ({ ...prev, [field]: val }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validate pairs same as add
    for (const pair of editPosition.applicantData) {
      const keyFilled = pair.key.trim() !== "";
      const valueFilled = pair.value.trim() !== "";
      if (keyFilled !== valueFilled) {
        alert(
          "Each Title must have a Description and each Description must have a Title. Please fill or clear both."
        );
        return;
      }
    }

    // Build applicant object
    const updatedApplicant = {};
    editPosition.applicantData.forEach((pair) => {
      const key = pair.key.trim();
      const value = pair.value.trim();
      if (key !== "") {
        updatedApplicant[key] = value;
      }
    });

    try {
      const token = localStorage.getItem("token");
      const tenant = getTenant();
      const companyData = await getCompanyIdByTenant(token, tenant);
      const companyId = companyData?.companyByTenant?.company_id;

      if (!companyId) throw new Error("Company ID not found");

      const payload = {
        name: editPosition.name,
        applicant: updatedApplicant,
      };

      const response = await fetch(
        `/api/positions/company/${companyId}/${editPosition.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to update position");

      const updatedPos = await response.json();

      setPositions((prev) =>
        prev.map((pos) => (pos.id === updatedPos.id ? updatedPos : pos))
      );
      setEditPosition(null);
    } catch (error) {
      alert(error.message || "Failed to update position");
    }
  };

  // --- DELETE MODAL HANDLERS ---
  const openDeleteModal = (pos) => {
    setDeletePosition(pos);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      const tenant = getTenant();
      const companyData = await getCompanyIdByTenant(token, tenant);
      const companyId = companyData?.companyByTenant?.company_id;

      if (!companyId) throw new Error("Company ID not found");

      const response = await fetch(
        `/api/positions/company/${companyId}/${deletePosition.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete position");

      setPositions((prev) =>
        prev.filter((pos) => pos.id !== deletePosition.id)
      );
      setDeletePosition(null);
    } catch (error) {
      alert(error.message || "Failed to delete position");
    }
  };

  // ✅ Show loading while theme or positions are loading
  if (loading || themeLoading) return <div className="p-6">Loading positions...</div>;

  return (
    <div className="p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Positions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 text-white px-4 py-2 rounded hover:transition cursor-pointer"
          style={{
            backgroundColor: theme,
            ':hover': {
              backgroundColor: getDarkerColor(theme)
            }
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = getDarkerColor(theme);
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = theme;
          }}
        >
          <PlusCircle size={18} /> Add Position
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search positions..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 transition"
          style={{
            '--tw-ring-color': getLighterColor(theme, 0.3)
          }}
          onFocus={(e) => {
            e.target.style.borderColor = theme;
            e.target.style.boxShadow = `0 0 0 2px ${getLighterColor(theme, 0.3)}`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">No</th>
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
              <th className="px-6 py-3">Additional</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedPositions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No positions found.
                </td>
              </tr>
            ) : (
              paginatedPositions.map((pos, index) => (
                <tr
                  key={pos.id}
                  className="border-t hover:transition"
                  style={{
                    ':hover': {
                      backgroundColor: getLighterColor(theme, 0.05)
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = getLighterColor(theme, 0.05);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td className="px-6 py-3">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-3">{pos.name}</td>
                  <td className="px-6 py-3 font-mono text-xs whitespace-pre-wrap">
                    {pos.additional && Object.keys(pos.additional).length > 0
                      ? Object.entries(pos.additional)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join("\n")
                      : "-"}
                  </td>

                  <td className="px-6 py-3 text-right flex justify-end gap-3">
                    <button
                      onClick={() => openEditModal(pos)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Edit size={16} /> 
                    </button>
                    <button
                      onClick={() => openDeleteModal(pos)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={16} /> 
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
          length: Math.ceil(filteredPositions.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded transition ${
              currentPage === index + 1
                ? "text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            style={
              currentPage === index + 1
                ? { backgroundColor: theme }
                : {}
            }
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Add Position Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6"
          >
            {/* Modal header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold">Add New Position</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer text-3xl leading-none select-none"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Position</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 transition"
                  style={{
                    '--tw-ring-color': getLighterColor(theme, 0.3)
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme;
                    e.target.style.boxShadow = `0 0 0 2px ${getLighterColor(theme, 0.3)}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              {/* Fixed 3 key-value pairs */}
              <div>
                <label className="block text-sm font-medium mb-2">Additional</label>

                {formData.positionData.map((pair, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder={`Title ${index + 1}`}
                      value={pair.key}
                      onChange={(e) =>
                        handleKeyValueChange(index, "key", e.target.value)
                      }
                      className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 transition"
                      onFocus={(e) => {
                        e.target.style.borderColor = theme;
                        e.target.style.boxShadow = `0 0 0 2px ${getLighterColor(theme, 0.3)}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <input
                      type="text"
                      placeholder={`Description ${index + 1}`}
                      value={pair.value}
                      onChange={(e) =>
                        handleKeyValueChange(index, "value", e.target.value)
                      }
                      className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 transition"
                      onFocus={(e) => {
                        e.target.style.borderColor = theme;
                        e.target.style.boxShadow = `0 0 0 2px ${getLighterColor(theme, 0.3)}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded hover:transition cursor-pointer"
                  style={{
                    backgroundColor: theme
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = getDarkerColor(theme);
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = theme;
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Position Modal */}
      {editPosition && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6"
          >
            {/* Modal header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold">Edit Position</h2>
              <button
                onClick={() => setEditPosition(null)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer text-3xl leading-none select-none"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Position</label>
                <input
                  type="text"
                  value={editPosition.name}
                  onChange={(e) => handleEditInputChange("name", e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 transition"
                  onFocus={(e) => {
                    e.target.style.borderColor = theme;
                    e.target.style.boxShadow = `0 0 0 2px ${getLighterColor(theme, 0.3)}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              {/* Fixed 3 key-value pairs */}
              <div>
                <label className="block text-sm font-medium mb-2">Additional</label>

                {editPosition.applicantData.map((pair, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder={`Title ${index + 1}`}
                      value={pair.key}
                      onChange={(e) =>
                        handleKeyValueChange(index, "key", e.target.value, true)
                      }
                      className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 transition"
                      onFocus={(e) => {
                        e.target.style.borderColor = theme;
                        e.target.style.boxShadow = `0 0 0 2px ${getLighterColor(theme, 0.3)}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <input
                      type="text"
                      placeholder={`Description ${index + 1}`}
                      value={pair.value}
                      onChange={(e) =>
                        handleKeyValueChange(index, "value", e.target.value, true)
                      }
                      className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 transition"
                      onFocus={(e) => {
                        e.target.style.borderColor = theme;
                        e.target.style.boxShadow = `0 0 0 2px ${getLighterColor(theme, 0.3)}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setEditPosition(null)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded hover:transition cursor-pointer"
                  style={{
                    backgroundColor: theme
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = getDarkerColor(theme);
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = theme;
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletePosition && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
          >
            <h2 className="text-xl font-bold mb-4">Delete Position</h2>
            <p>
              Are you sure you want to delete the position{" "}
              <strong>{deletePosition.name}</strong>?
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setDeletePosition(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-white rounded hover:transition cursor-pointer"
                style={{
                  backgroundColor: theme
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = getDarkerColor(theme);
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = theme;
                }}
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

export default Positions;