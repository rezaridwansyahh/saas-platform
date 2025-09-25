import React from "react";

const RoleManagementTable = () => {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left text-gray-700 border border-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Categories</th>
            <th scope="col" className="px-6 py-3">Create</th>
            <th scope="col" className="px-6 py-3">Read</th>
            <th scope="col" className="px-6 py-3">Update</th>
            <th scope="col" className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-gray-50 even:bg-white hover:bg-blue-50 transition">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900">Employee</th>
            <td className="px-6 py-4"><input type="checkbox" disabled/></td>
            <td className="px-6 py-4"><input type="checkbox" disabled/></td>
            <td className="px-6 py-4"><input type="checkbox" disabled/></td>
            <td className="px-6 py-4"><input type="checkbox" disabled/></td>
          </tr>

          <tr className="odd:bg-gray-50 even:bg-white hover:bg-blue-50 transition">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900">Users</th>
            <td className="px-6 py-4"><input type="checkbox" disabled/></td>
            <td className="px-6 py-4"><input type="checkbox" disabled/></td>
            <td className="px-6 py-4"><input type="checkbox" disabled/></td>
            <td className="px-6 py-4"><input type="checkbox" disabled/></td>
          </tr>

          <tr className="odd:bg-gray-50 even:bg-white hover:bg-blue-50 transition">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900">Applicant</th>
            <td className="px-6 py-4"><input type="checkbox" disabled/></td>
            <td className="px-6 py-4"><input type="checkbox" disabled/></td>
            <td className="px-6 py-4"><input type="checkbox" disabled/></td>
            <td className="px-6 py-4"><input type="checkbox" disabled/></td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagementTable;
