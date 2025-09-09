// import { colorMap } from "../themes/colorMap";
// import { getTenant } from "../utils/getTenant";

// const DashboardCard = ({ title, value, icon }) => {
//   const tenant = getTenant(); // e.g., "ptap", "anytime", "osp"

//   // Determine the theme color based on tenant
//   const themeColor = colorMap[tenant]?.bg || "#EF4444"; // fallback to red

//   return (
//     <div
//       className="bg-white rounded-lg shadow p-4 flex justify-between items-center border-l-4"
//       style={{ borderLeftColor: themeColor }}
//     >
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <p className="text-xl font-bold text-gray-800">{value}</p>
//       </div>
//       <div className="text-2xl" style={{ color: themeColor }}>
//         {icon}
//       </div>
//     </div>
//   );
// };

// export default DashboardCard;


import { useState, useEffect } from "react";
import { getTenant } from "../utils/getTenant";

const DashboardCard = ({ title, value, icon }) => {
  const tenant = getTenant(); // e.g., "ptap", "anytime", "osp"
  const [themeColor, setThemeColor] = useState("red"); // default fallback

  useEffect(() => {
    const fetchCompanyTheme = async () => {
      try {
        const res = await fetch("/api/companies/tenant");
        const data = await res.json();

        const company = data.allEmployees.find(
          (emp) => emp.tenant_name === tenant
        );

        if (company?.theme) {
          setThemeColor(company.theme);
        }
      } catch (err) {
        console.error("Failed to fetch company theme:", err);
      }
    };

    fetchCompanyTheme();
  }, [tenant]);

  return (
    <div
      className="bg-white rounded-lg shadow p-4 flex justify-between items-center border-l-4"
      style={{ borderLeftColor: themeColor }}
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="text-2xl" style={{ color: themeColor }}>
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
