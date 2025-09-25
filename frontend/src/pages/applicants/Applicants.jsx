// src/pages/applicants/Applicants.jsx
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProfileImage from "../../components/misc/ProfileImage";
import DataTable from "../../components/tables/DataTable";
import { useApplicants } from "../../hooks/useApplicants";

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
  const { applicants, positions, loading, setApplicants } = useApplicants();

  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [themeColors, setThemeColors] = useState(colorMap.red);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  if (loading) return <div className="p-6">Loading applicants...</div>;

  // Handle sorting
  const handleSort = (field) => {
    const order = sortBy === field && sortDirection === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortDirection(order);
  };

  // Filter
  const filteredApplicants = applicants
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((app) =>
      positionFilter ? app.position === parseInt(positionFilter) : true
    );

  // Sort
  const sortedApplicants = [...filteredApplicants].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (sortBy === "position") {
      aVal = positions.find((p) => p.position_id === a.position)?.name || "";
      bVal = positions.find((p) => p.position_id === b.position)?.name || "";
    }

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const paginatedApplicants = sortedApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Define table columns
  const columns = [
    {
      key: "picture",
      label: "Picture",
      render: (row) => (
        <ProfileImage
          userId={row.id}
          initial={row.name?.charAt(0).toUpperCase()}
        />
      ),
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (row) => (
        <Link
          to={`/applicants/${row.id}`}
          className={`${themeColors.text} hover:underline`}
        >
          {row.name}
        </Link>
      ),
    },
    {
      key: "position",
      label: "Position",
      sortable: true,
      render: (row) =>
        positions.find((p) => p.position_id === row.position)?.name ||
        row.position,
    },
  ];

  return (
    <div className="p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Applicants</h1>
        <button
          onClick={() => navigate("/applicants/new")}
          className={`flex items-center gap-2 ${themeColors.bg} text-white px-4 py-2 rounded ${themeColors.hoverBg} transition`}
        >
          <PlusCircle size={18} /> Add Applicant
        </button>
      </div>

      {/* Search + filter */}
      <div className="mb-4 flex flex-col md:flex-row gap-2 md:items-center md:gap-4">
        <input
          type="text"
          placeholder="Search applicants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm"
        />

        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded shadow-sm"
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
      <DataTable
        columns={columns}
        data={paginatedApplicants}
        sortBy={sortBy}
        sortDirection={sortDirection}
        handleSort={handleSort}
        themeColors={themeColors}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onEdit={(row) => console.log("Edit", row)}
        onDelete={(row) => console.log("Delete", row)}
        showApplicantsTable ={true}
      />

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({
          length: Math.ceil(sortedApplicants.length / itemsPerPage),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1
                ? `${themeColors.bg} text-white`
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Applicants;
