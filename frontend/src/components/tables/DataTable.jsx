// src/components/DataTable.jsx
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Edit,
  Trash2,
} from "lucide-react";

export default function DataTable({
  columns = [], // [{ key, label, sortable?, render? }]
  data = [], // [{ id, ... }]
  sortBy,
  sortDirection,
  handleSort,
  themeColors,
  onEdit,
  onDelete,
  currentPage = 1,
  itemsPerPage = 10,
  showApplicantsTable = false,
  showDepartmentsTable = false
}) {
  const hoverBg = themeColors?.bgLight
    ? `hover:${themeColors.bgLight}`
    : "hover:bg-gray-50";

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      {showApplicantsTable && (
        <table className="min-w-full bg-white text-sm text-left">
          {/* ===== Table Head ===== */}
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
            <tr>
              {/* Row numbering */}
              <th scope="col" className="px-6 py-3">
                No
              </th>

              {/* Dynamic column headers */}
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-6 py-3 ${col.sortable ? "cursor-pointer" : ""}`}
                  onClick={() => col.sortable && handleSort?.(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortBy === col.key ? (
                      sortDirection === "asc" ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )
                    ) : col.sortable ? (
                      <ChevronsUpDown size={14} />
                    ) : null}
                  </div>
                </th>
              ))}

              {/* Action column */}
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          {/* ===== Table Body ===== */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="px-6 py-8 text-center text-gray-500 italic"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`border-t transition ${hoverBg}`}
                >
                  {/* Row Number (continuous across pages) */}
                  <td className="px-6 py-3">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>

                  {/* Dynamic Data Cells */}
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-3">
                      {col.render ? col.render(row) : row[col.key] || "-"}
                    </td>
                  ))}

                  {/* Actions */}
                  <td className="px-6 py-3 text-right space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        aria-label={`Edit ${row.id}`}
                      >
                        <Edit size={18} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className={`${themeColors?.text || "text-red-600"
                          } cursor-pointer`}
                        aria-label={`Delete ${row.id}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      {showDepartmentsTable && (
        <table className="min-w-full bg-white text-sm text-left">
          {/* ===== Table Head ===== */}
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
            <tr>
              {/* Row numbering */}
              <th scope="col" className="px-6 py-3">
                No
              </th>

              {/* Dynamic column headers */}
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-6 py-3 ${col.sortable ? "cursor-pointer" : ""}`}
                  onClick={() => col.sortable && handleSort?.(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortBy === col.key ? (
                      sortDirection === "asc" ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )
                    ) : col.sortable ? (
                      <ChevronsUpDown size={14} />
                    ) : null}
                  </div>
                </th>
              ))}

              {/* Action column */}
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          {/* ===== Table Body ===== */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="px-6 py-8 text-center text-gray-500 italic"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`border-t transition ${hoverBg}`}
                >
                  {/* Row Number (continuous across pages) */}
                  <td className="px-6 py-3">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>

                  {/* Dynamic Data Cells */}
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-3">
                      {col.render ? col.render(row) : row[col.key] || "-"}
                    </td>
                  ))}

                  {/* Actions */}
                  <td className="px-6 py-3 text-right space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        aria-label={`Edit ${row.id}`}
                      >
                        <Edit size={18} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className={`${themeColors?.text || "text-red-600"
                          } cursor-pointer`}
                        aria-label={`Delete ${row.id}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
