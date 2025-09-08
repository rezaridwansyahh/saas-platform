
// import { colorMap } from "../themes/colorMap";
// import { getTenant } from "../utils/getTenant";

// const DashboardCard = ({ title, value, icon }) => {
//   const tenant = getTenant(); // e.g., "red", "blue", "purple"

//   // Wrap the color string into an object with `primary`
//   const theme = { primary: colorMap[tenant] || "#EF4444" };

//   return (
//     <div
//       className="bg-white rounded-lg shadow p-4 flex justify-between items-center border-l-4"
//       style={{ borderLeftColor: theme.primary }}
//     >
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <p className="text-xl font-bold text-gray-800">{value}</p>
//       </div>
//       <div className="text-2xl" style={{ color: theme.primary }}>
//         {icon}
//       </div>
//     </div>
//   );
// };

// export default DashboardCard


import { colorMap } from "../themes/colorMap";
import { getTenant } from "../utils/getTenant";

const DashboardCard = ({ title, value, icon }) => {
  const tenant = getTenant(); // e.g., "ptap", "anytime", "osp"

  // Determine the theme color based on tenant
  const themeColor = colorMap[tenant]?.bg || "#EF4444"; // fallback to red

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
