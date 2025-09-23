// src/pages/positions/Positions.jsx
import { useEffect, useState, useRef } from "react";
import {
  PlusCircle,
  Edit,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Trash2,
} from "lucide-react";
import { getTenant, getCompanyIdByTenant } from "../../utils/getTenant";
import { useTheme } from "../../context/ThemeContext";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [editPosition, setEditPosition] = useState(null);
  const [deletePosition, setDeletePosition] = useState(null);
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

  const getLighterColor = (color, opacity = 0.1) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const getDarkerColor = (color, factor = 0.8) => {
    const hex = color.replace("#", "");
    const r = Math.floor(parseInt(hex.substr(0, 2), 16) * factor);
    const g = Math.floor(parseInt(hex.substr(2, 2), 16) * factor);
    const b = Math.floor(parseInt(hex.substr(4, 2), 16) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Fetch positions and departments
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const tenant = getTenant();
        const companyData = await getCompanyIdByTenant(token, tenant);
        const companyId = companyData?.companyByTenant?.company_id;
        if (!companyId) throw new Error("Company ID not found");

        // Fetch positions
        const posRes = await fetch(`/api/positions/company/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const posData = await posRes.json();
        setPositions(Array.isArray(posData.positions) ? posData.positions : []);

        // Fetch departments
        const deptRes = await fetch("/api/departments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const deptData = await deptRes.json();
        setDepartments(Array.isArray(deptData.departments) ? deptData.departments : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Modal outside click handler
  useEffect(() => {
    if (!showModal && !editPosition && !deletePosition) return;
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
        setEditPosition(null);
        setDeletePosition(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal, editPosition, deletePosition]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  // Filter + sort + paginate
  const filteredPositions = positions
    .filter((pos) =>
      pos.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((pos) =>
      !selectedDept ? true : pos.department_id === Number(selectedDept)
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

  // Key-value handlers
  const handleKeyValueChange = (index, field, val, isEdit = false) => {
    if (isEdit) {
      setEditPosition((prev) => {
        const newData = [...prev.applicantData];
        newData[index][field] = val;
        return { ...prev, applicantData: newData };
      });
    } else {
      setFormData((prev) => {
        const newData = [...prev.positionData];
        newData[index][field] = val;
        return { ...prev, positionData: newData };
      });
    }
  };

  // Loading state
  if (loading || themeLoading) return <div className="p-6">Loading positions...</div>;

  return (
    <div className="p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Positions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 text-white px-4 py-2 rounded hover:transition cursor-pointer"
          style={{ backgroundColor: theme }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = getDarkerColor(theme); }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = theme; }}
        >
          <PlusCircle size={18} /> Add Position
        </button>
      </div>

      {/* Search & Department filter */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
        <input
          type="text"
          placeholder="Search positions..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 transition"
          style={{ '--tw-ring-color': getLighterColor(theme, 0.3) }}
        />
        <select
          value={selectedDept}
          onChange={(e) => { setSelectedDept(e.target.value); setCurrentPage(1); }}
          className="w-full md:w-1/4 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 transition mt-2 md:mt-0"
          style={{ '--tw-ring-color': getLighterColor(theme, 0.3) }}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
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
                  {sortBy === "name" ? (sortDirection === "asc" ? <ChevronUp size={14}/> : <ChevronDown size={14}/>) : <ChevronsUpDown size={14}/>}
                </div>
              </th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Additional</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPositions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No positions found.</td>
              </tr>
            ) : (
              paginatedPositions.map((pos, index) => (
                <tr key={pos.id} className="border-t hover:transition">
                  <td className="px-6 py-3">{(currentPage-1)*itemsPerPage + index +1}</td>
                  <td className="px-6 py-3">{pos.name}</td>
                  <td className="px-6 py-3">{departments.find(d => d.id === pos.department_id)?.name || "-"}</td>
                  <td className="px-6 py-3 font-mono text-xs whitespace-pre-wrap">
                    {pos.additional && Object.keys(pos.additional).length > 0
                      ? Object.entries(pos.additional).map(([key, value]) => `${key}: ${value}`).join("\n")
                      : "-"}
                  </td>
                  <td className="px-6 py-3 text-right flex justify-end gap-3">
                    <button onClick={() => openEditModal(pos)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"><Edit size={16}/></button>
                    <button onClick={() => openDeleteModal(pos)} className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: Math.ceil(filteredPositions.length/itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index+1)}
            className={`px-3 py-1 rounded transition ${currentPage===index+1 ? "text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
            style={currentPage===index+1 ? { backgroundColor: theme } : {}}
          >
            {index+1}
          </button>
        ))}
      </div>

      {/* --- Modals (Add, Edit, Delete) --- */}
      {/* Keep your existing modal code unchanged here */}
    </div>
  );
};

export default Positions;
