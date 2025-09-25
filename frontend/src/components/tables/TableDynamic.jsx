import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

const TableDynamic = ({ data, ShowEdit = true, ShowDelete = true, onEdit = () => { }, onDelete = () => { } }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    if (!data || data.length === 0) {
        return <p className="text-gray-500">No data available.</p>;
    }

    const headers = Object.keys(data[0]);

    // hitung paginasi
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = data.slice(startIndex, startIndex + rowsPerPage);

    return (
        <div className="space-y-4 w-full">
            {/* pilihan rows per page */}
            <div className="flex justify-between items-center">
                <div>
                    <label className="text-sm mr-2">Rows per page:</label>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border rounded px-2 py-1 text-sm"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>

                <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </div>
            </div>

            {/* Wrapper dengan batas lebar + scroll */}
            <div className="max-h-[400px] relative overflow-x-auto overflow-y-auto border shadow-md sm:rounded">
                <table className="w-full text-sm text-left rtl:text-right border-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="bg-gray-300 text-gray-700">
                            {headers.map((header) => (
                                <th
                                    key={header}
                                    className="px-6 py-4 text-left border border-gray-400"
                                >
                                    {header}
                                </th>
                            ))}
                            <th className="px-6 py-4 border border-gray-400 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentData.map((row, i) => (
                            <tr
                                key={row.id}
                                className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
                            >
                                {headers.map((header) => (
                                    <td
                                        key={header}
                                        className="px-6 py-4 border border-gray-400 whitespace-nowrap"
                                    >
                                        {row[header]}
                                    </td>
                                ))}

                                <td className="px-6 py-4 border border-gray-400 text-right space-x-auto">
                                    {ShowEdit && (<button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                        <Edit size={18}
                                            onClick={() => onEdit?.(row)}
                                        />
                                    </button>
                                    )}
                                    {ShowDelete && (<button className="text-red-600 hover:text-red-800 cursor-pointer">
                                        <Trash2 size={18}
                                            onClick={() => onDelete?.(row)}
                                        />
                                    </button>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* pagination controls */}
            <div className="flex justify-start items-center gap-2">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="text-sm">{currentPage}</span>
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TableDynamic;
