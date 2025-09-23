// // src/components/Sidebar.jsx
// import { useEffect, useState } from "react";
// import { NavLink, Link } from "react-router-dom";
// import {
//   Home,
//   ChevronLeft,
//   ChevronRight,
//   HelpCircle,
//   Settings,
// } from "lucide-react";
// import useCompanyLogo from "../../hooks/useCompanyLogo";
// import { getTenant } from "../../utils/getTenant";

// // color map
// const colorMap = {
//   red: {
//     active: "bg-red-50 text-red-600 border-l-4 border-red-600",
//     hover: "hover:bg-red-100",
//     badge: "bg-red-500 text-white",
//   },
//   purple: {
//     active: "bg-purple-50 text-purple-600 border-l-4 border-purple-600",
//     hover: "hover:bg-purple-100",
//     badge: "bg-purple-500 text-white",
//   },
//   blue: {
//     active: "bg-blue-50 text-blue-600 border-l-4 border-blue-600",
//     hover: "hover:bg-blue-100",
//     badge: "bg-blue-500 text-white",
//   },
// };

// const Sidebar = ({ collapsed, setCollapsed }) => {
//   const logo = useCompanyLogo();
//   const [groupedMenu, setGroupedMenu] = useState([]);
//   const [expandedModules, setExpandedModules] = useState([]);
//   const [theme, setTheme] = useState("red"); // default
//   const tenant = getTenant();

//   const toggleModule = (moduleId) => {
//     setExpandedModules((prev) =>
//       prev.includes(moduleId)
//         ? prev.filter((id) => id !== moduleId)
//         : [...prev, moduleId]
//     );
//   };

//   useEffect(() => {
//     const fetchCompanyAndMenu = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const company = JSON.parse(localStorage.getItem("company"));

//         // 1. Fetch company info (to get theme)
//         const companyRes = await fetch(
//           `http://${tenant}.localhost/api/companies`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const companyData = await companyRes.json();
//         const tenantCompany = companyData.allEmployees.find(
//           (c) => c.tenant_name === tenant
//         );

//         if (tenantCompany?.theme) {
//           setTheme(tenantCompany.theme);
//         }

//         // 2. Fetch modules + menus
//         // const [modulesRes, menusRes] = await Promise.all([
//         //   fetch("/api/module-company", { headers: { Authorization: `Bearer ${token}` } }),
//         //   fetch("/api/menus", { headers: { Authorization: `Bearer ${token}` } }),
//         // ]);

//         const [modulesRes, menusRes] = await Promise.all([
//   fetch(`http://${tenant}.localhost/api/modules/company/${company.id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   }),
//   fetch(`http://${tenant}.localhost/api/menus/company/${company.id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   }),
// ]);


//         const modulesData = await modulesRes.json();
//         const menusData = await menusRes.json();

//         // Deduplicate modules by name
//         const uniqueModules = modulesData.modules.filter(
//           (mod, index, self) =>
//             index === self.findIndex((m) => m.module_name === mod.module_name)
//         );

//         // Menus blacklist (never render these)
//         const menuBlacklist = ["Add Employee"];

//         // Group menus under modules and filter out empty ones
//         const grouped = uniqueModules
//           .map((mod) => ({
//             ...mod,
//             items: menusData.menus.filter(
//               (m) =>
//                 m.module_id === mod.id && !menuBlacklist.includes(m.module_name)
//             ),
//           }))
//           .filter((mod) => mod.items.length > 0);

//         setGroupedMenu(grouped);
//       } catch (err) {
//         console.error("Failed to fetch company/modules/menus:", err);
//       }
//     };

//     fetchCompanyAndMenu();
//   }, [tenant]);

//   // Map backend menu names to frontend routes
//   const routeMap = {
//     "Employee List": "/applicants",
//     "Payslips": "/payslips",
//     "Clock In/Out": "/clock-in-out",
//     "Time Reports": "/time-reports",
//     "Settings": "/settings",
//   };

//   const getRoute = (menuName) => {
//     return routeMap[menuName] || `/${menuName.toLowerCase().replace(/\s+/g, "-")}`;
//   };

//   // pick correct color set
//   const colors = colorMap[theme] || colorMap["red"];

//   return (
//     <aside
//       className={`h-screen bg-white shadow-md p-4 fixed top-0 left-0 flex flex-col transition-all duration-300 z-40 ${
//         collapsed ? "w-20" : "w-60"
//       }`}
//     >
//       {/* Logo & Toggle */}
//       <div className="flex items-center justify-between mb-6">
//         <Link to="/" className="flex items-center">
//           {logo && (
//             <img
//               src={logo}
//               alt="Company Logo"
//               className={`transition-all duration-300 ${
//                 collapsed ? "w-10 mx-auto" : "w-36"
//               }`}
//             />
//           )}
//         </Link>
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="text-gray-500 hover:text-red-500"
//         >
//           {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex flex-col gap-2 text-sm overflow-y-auto flex-1">
//         {/* Static Dashboard */}
//         <NavItem
//           to="/"
//           label="Dashboard"
//           collapsed={collapsed}
//           colors={colors}
//         />

//          {/* 👇 Add this static test link for ApplicantsDummy */}
//         <NavItem
//           to="/applicants-dummy"
//           label="Applicants Dummy"
//           collapsed={collapsed}
//           colors={colors}
//         />

//         {/* Dynamic modules + menus */}
//         {groupedMenu.map((mod) => (
//           <div key={mod.id}>
//             {/* Module header */}
//             {!collapsed && (
//               <div
//                 onClick={() => toggleModule(mod.id)}
//                 className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer font-medium transition-all ${
//                   expandedModules.includes(mod.id)
//                     ? colors.active
//                     : `text-gray-700 ${colors.hover}`
//                 }`}
//               >
//                 <span className="truncate">{mod.module_name}</span>
//                 <span className="ml-auto">
//                   {expandedModules.includes(mod.id) ? "▾" : "▸"}
//                 </span>
//               </div>
//             )}

//             {/* Submenu items */}
//             {expandedModules.includes(mod.id) &&
//               !collapsed &&
//               mod.items.map((item) => (
//                 <NavItem
//                   key={item.id}
//                   to={getRoute(item.name)}
//                   label={item.name}
//                   collapsed={collapsed}
//                   colors={colors}
//                 />
//               ))}
//           </div>
//         ))}
//       </nav>

//       {/* Footer static items */}
//       <div className="mt-auto flex flex-col gap-2 text-sm">
//         <NavItem
//           to="/help"
//           icon={<HelpCircle size={20} />}
//           label="Help"
//           collapsed={collapsed}
//           colors={colors}
//         />
//         <NavItem
//           to="/settings"
//           icon={<Settings size={20} />}
//           label="Settings"
//           collapsed={collapsed}
//           colors={colors}
//         />
//       </div>
//     </aside>
//   );
// };

// // NavItem component
// const NavItem = ({ to, icon, label, collapsed, badge, colors }) => {
//   return (
//     <NavLink
//       to={to}
//       end
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-3 py-2 rounded-md transition-all font-medium relative ${
//           isActive ? colors.active : `text-gray-700 ${colors.hover}`
//         }`
//       }
//     >
//       {icon && <div className="w-5 h-5 flex-shrink-0">{icon}</div>}
//       {!collapsed && <span className="truncate">{label}</span>}

//       {badge && !collapsed && (
//         <span
//           className={`ml-auto ${colors.badge} text-xs rounded-full px-2 py-1 min-w-[20px] text-center`}
//         >
//           {badge}
//         </span>
//       )}
//       {badge && collapsed && (
//         <span
//           className={`absolute -top-1 -right-1 ${colors.badge} text-xs rounded-full w-4 h-4 flex items-center justify-center`}
//         >
//           {badge}
//         </span>
//       )}
//     </NavLink>
//   );
// };

// export default Sidebar;

//export mmyself to sleep

// src/components/Sidebar.jsx
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Home,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import useCompanyLogo from "../../hooks/useCompanyLogo";
import { getTenant } from "../../utils/getTenant";

// Theme colors (could be moved to src/themes/colorMap.js for reuse)
const colorMap = {
  red: {
    active: "bg-red-50 text-red-600 border-l-4 border-red-600",
    hover: "hover:bg-red-100",
    badge: "bg-red-500 text-white",
  },
  purple: {
    active: "bg-purple-50 text-purple-600 border-l-4 border-purple-600",
    hover: "hover:bg-purple-100",
    badge: "bg-purple-500 text-white",
  },
  blue: {
    active: "bg-blue-50 text-blue-600 border-l-4 border-blue-600",
    hover: "hover:bg-blue-100",
    badge: "bg-blue-500 text-white",
  },
};

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const logo = useCompanyLogo();
  const [groupedMenu, setGroupedMenu] = useState([]);
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [theme, setTheme] = useState("red"); // fallback theme
  const tenant = getTenant();

  // Toggle module expand/collapse
  const toggleModule = (id) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  // Fetch company info + menus
  useEffect(() => {
    const fetchCompanyAndMenu = async () => {
      try {
        const token = localStorage.getItem("token");
        const company = JSON.parse(localStorage.getItem("company"));

        // Fetch company to get theme
        const companyRes = await fetch(
          `http://${tenant}.localhost/api/companies/${company.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const companyData = await companyRes.json();
        if (companyData.theme) setTheme(companyData.theme);

        // Fetch modules + menus
        const [modulesRes, menusRes] = await Promise.all([
          fetch(`http://${tenant}.localhost/api/modules/company/${company.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`http://${tenant}.localhost/api/menus/company/${company.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const modulesData = await modulesRes.json();
        const menusData = await menusRes.json();

        // Deduplicate modules by name
        const uniqueModules = modulesData.modules.filter(
          (mod, index, self) =>
            index === self.findIndex((m) => m.module_name === mod.module_name)
        );

        // Blacklist menus
        const menuBlacklist = ["Add Employee"];

        // Group menus under modules
        const grouped = uniqueModules
          .map((mod) => ({
            ...mod,
            items: menusData.menus.filter(
              (m) =>
                m.module_id === mod.id && !menuBlacklist.includes(m.module_name)
            ),
          }))
          .filter((mod) => mod.items.length > 0);

        setGroupedMenu(grouped);
      } catch (err) {
        console.error("Sidebar fetch error:", err);
        setGroupedMenu([]); // fallback
      }
    };

    fetchCompanyAndMenu();
  }, [tenant]);

  // Map backend menu names to routes
  const routeMap = {
    "Employee List": "/applicants",
    Payslips: "/payslips",
    "Clock In/Out": "/clock-in-out",
    "Time Reports": "/time-reports",
    Settings: "/settings",
  };

  const getRoute = (menuName) =>
    routeMap[menuName] ||
    `/${menuName.toLowerCase().replace(/\s+/g, "-")}`;

  // Pick theme colors
  const colors = colorMap[theme] || colorMap.red;

  return (
    <aside
      className={`h-screen bg-white shadow-md p-4 fixed top-0 left-0 flex flex-col transition-all duration-300 z-40
        ${isCollapsed ? "w-20" : "w-60"}`}
    >
      {/* Logo + Collapse button */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center">
          {logo && (
            <img
              src={logo}
              alt="Company Logo"
              className={`transition-all duration-300 ${
                isCollapsed ? "w-10 mx-auto" : "w-36"
              }`}
            />
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-red-500"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 text-sm overflow-y-auto flex-1">
        {/* Static Dashboard */}
        <NavItem to="/" icon={<Home size={20} />} label="Dashboard" collapsed={isCollapsed} colors={colors} />

        {/* Static ApplicantsDummy test link */}
        <NavItem to="/applicants-dummy" label="Applicants Dummy" collapsed={isCollapsed} colors={colors} />

        {/* Dynamic modules */}
        {groupedMenu.map((mod) => {
          const isExpanded = expandedModules.has(mod.id);
          return (
            <div key={mod.id}>
              {/* Module header */}
              {!isCollapsed && (
                <div
                  onClick={() => toggleModule(mod.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer font-medium transition-all
                    ${isExpanded ? colors.active : `text-gray-700 ${colors.hover}`}`}
                >
                  <span className="truncate">{mod.module_name}</span>
                  <span className="ml-auto">
                    {isExpanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRightIcon size={16} />
                    )}
                  </span>
                </div>
              )}

              {/* Submenu items */}
              {isExpanded &&
                !isCollapsed &&
                mod.items.map((item) => (
                  <NavItem
                    key={item.id}
                    to={getRoute(item.name)}
                    label={item.name}
                    collapsed={isCollapsed}
                    colors={colors}
                  />
                ))}
            </div>
          );
        })}
      </nav>

      {/* Footer items */}
      <div className="mt-auto flex flex-col gap-2 text-sm">
        <NavItem to="/help" icon={<HelpCircle size={20} />} label="Help" collapsed={isCollapsed} colors={colors} />
        <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" collapsed={isCollapsed} colors={colors} />
      </div>
    </aside>
  );
};

// NavItem component
const NavItem = ({ to, icon, label, collapsed, badge, colors }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-md transition-all font-medium relative
      ${isActive ? colors.active : `text-gray-700 ${colors.hover}`}`
    }
  >
    {icon && <div className="w-5 h-5 flex-shrink-0">{icon}</div>}
    {!collapsed && <span className="truncate">{label}</span>}

    {/* Badge */}
    {badge && !collapsed && (
      <span
        className={`ml-auto ${colors.badge} text-xs rounded-full px-2 py-1 min-w-[20px] text-center`}
      >
        {badge}
      </span>
    )}
    {badge && collapsed && (
      <span
        className={`absolute -top-1 -right-1 ${colors.badge} text-xs rounded-full w-4 h-4 flex items-center justify-center`}
      >
        {badge}
      </span>
    )}
  </NavLink>
);

export default Sidebar;
