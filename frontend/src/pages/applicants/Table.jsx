// src/pages/applicants/Table.jsx
import { useEffect, useRef, useState } from "react";

const Table = ({ fetchedData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const containerRef = useRef(null);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
      setLoading(false);
    }
  }, [fetchedData]);

  // Paginate
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Gesture state
    let startX = 0;
    let startY = 0;
    let initialScrollLeft = 0;
    let isHorizontal = null; // null = undecided, true = horizontal, false = vertical

    function onTouchStart(e) {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      initialScrollLeft = el.scrollLeft;
      isHorizontal = null;
    }

    function onTouchMove(e) {
      if (e.touches.length !== 1) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dx = x - startX;
      const dy = y - startY;

      // decide if user intends horizontal or vertical gesture
      if (isHorizontal === null) {
        // threshold to avoid deciding on tiny jitter
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
          isHorizontal = Math.abs(dx) > Math.abs(dy);
        } else {
          return; // not enough movement yet
        }
      }

      if (isHorizontal) {
        // horizontal gesture: prevent page from handling it and scroll container manually
        e.preventDefault(); // requires passive:false in the listener
        // move scrollLeft by the inverse of finger movement
        el.scrollLeft = initialScrollLeft - (x - startX);
      } else {
        // vertical gesture: let page handle it (do nothing)
      }
    }

    function onTouchEnd() {
      isHorizontal = null;
    }

    // add listeners with passive control so we can call preventDefault()
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []); // run once after mount

  if (loading) return <p>Loading...</p>;
  if (data.length === 0) return <p>No data available.</p>;

  // derive keys from first item (exclude id if present)
  const keys = Object.keys(currentItems[0] || {}).filter((k) => k !== "id");

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Applicants (Dummy)</h2>

      {/* scroll container — only this element handles horizontal swipe */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto border border-gray-300 rounded"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain", // help contain scroll to this element
          maxWidth: "100%",
        }}
      >
        {/* inline-block wrapper makes the table naturally sized > container so overflow occurs */}
        <div className="inline-block w-max">
          <table className="border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border whitespace-nowrap">No</th>
                {keys.map((key) => (
                  <th key={key} className="px-4 py-2 border whitespace-nowrap">
                    {key}
                  </th>
                ))}
                <th className="px-4 py-2 border whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, idx) => (
                <tr key={item.id ?? idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center whitespace-nowrap">
                    {indexOfFirst + idx + 1}
                  </td>

                  {keys.map((key) => (
                    <td key={key} className="px-4 py-2 border whitespace-nowrap">
                      {item[key]}
                    </td>
                  ))}

                  <td className="px-4 py-2 border whitespace-nowrap">
                    <div className="flex gap-2 justify-center">
                      <button className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
                        Edit
                      </button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded text-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* pagination outside scroll area */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;



// import React, { useState } from "react";
// import { Edit, Trash2 } from "lucide-react";

// const Table = ({ data, onEdit, onDelete }) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     if (!data || data.length === 0) {
//         return <p className="text-gray-500">No data available.</p>;
//     }

//     const headers = Object.keys(data[0]);

//     // hitung paginasi
//     const totalPages = Math.ceil(data.length / rowsPerPage);
//     const startIndex = (currentPage - 1) * rowsPerPage;
//     const currentData = data.slice(startIndex, startIndex + rowsPerPage);

//     return (
//         <div className="space-y-4 w-full">
//             {/* pilihan rows per page */}
//             <div className="flex justify-between items-center">
//                 <div>
//                     <label className="text-sm mr-2">Rows per page:</label>
//                     <select
//                         value={rowsPerPage}
//                         onChange={(e) => {
//                             setRowsPerPage(Number(e.target.value));
//                             setCurrentPage(1);
//                         }}
//                         className="border rounded px-2 py-1 text-sm"
//                     >
//                         <option value={5}>5</option>
//                         <option value={10}>10</option>
//                         <option value={50}>50</option>
//                         <option value={100}>100</option>
//                     </select>
//                 </div>

//                 <div className="text-sm text-gray-600">
//                     Page {currentPage} of {totalPages}
//                 </div>
//             </div>

//             {/* Wrapper dengan batas lebar + scroll */}
//             <div className="max-h-[400px] relative overflow-x-auto overflow-y-auto border shadow-md sm:rounded">
//                 <table className="w-full table-fixed text-sm text-left border-gray-500">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                         <tr className="bg-gray-300 text-gray-700">
//                             <th className="w-[60px] px-4 py-2 border border-gray-400">ID</th>
//                             <th className="w-[180px] px-4 py-2 border border-gray-400">Name</th>
//                             <th className="w-[150px] px-4 py-2 border border-gray-400">Position</th>
//                             <th className="w-[80px] px-4 py-2 border border-gray-400">Age</th>
//                             <th className="w-[120px] px-4 py-2 border border-gray-400">Gender</th>
//                             <th className="w-[120px] px-4 py-2 border border-gray-400 text-right">
//                                 Actions
//                             </th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {currentData.map((row, i) => (
//                             <tr
//                                 key={row.id}
//                                 className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
//                             >
//                                 <td className="px-4 py-2 border border-gray-400">{row.id}</td>
//                                 <td className="px-4 py-2 border border-gray-400 truncate">{row.name}</td>
//                                 <td className="px-4 py-2 border border-gray-400">{row.position}</td>
//                                 <td className="px-4 py-2 border border-gray-400">{row.age}</td>
//                                 <td className="px-4 py-2 border border-gray-400">{row.gender}</td>
//                                 <td className="px-4 py-2 border border-gray-400 text-right space-x-2">
//                                     <button
//                                         className="text-blue-600 hover:text-blue-800"
//                                         onClick={() => onEdit && onEdit(row)}
//                                     >
//                                         <Edit size={18} />
//                                     </button>
//                                     <button
//                                         className="text-red-600 hover:text-red-800"
//                                         onClick={() => onDelete && onDelete(row.id)}
//                                     >
//                                         <Trash2 size={18} />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* pagination controls */}
//             <div className="flex justify-start items-center gap-2">
//                 <button
//                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1 border rounded disabled:opacity-50"
//                 >
//                     Prev
//                 </button>
//                 <span className="text-sm">{currentPage}</span>
//                 <button
//                     onClick={() =>
//                         setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                     }
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-1 border rounded disabled:opacity-50"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Table;
