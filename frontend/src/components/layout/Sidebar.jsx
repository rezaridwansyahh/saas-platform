// // src/components/Sidebar.jsx
// import { useEffect, useState } from "react";
// import { NavLink, Link } from "react-router-dom";
// import {
//   Home,
//   ChevronLeft,
//   ChevronRight,
//   HelpCircle,
//   Settings,
//   ChevronDown,
//   ChevronRight as ChevronRightIcon,
// } from "lucide-react";
// import useCompanyLogo from "../../hooks/useCompanyLogo";
// import { getTenant } from "../../utils/getTenant";

// // Theme colors (could be moved to src/themes/colorMap.js for reuse)
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

// const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
//   const logo = useCompanyLogo();
//   const [groupedMenu, setGroupedMenu] = useState([]);
//   const [expandedModules, setExpandedModules] = useState(new Set());
//   const [theme, setTheme] = useState("red"); // fallback theme
//   const tenant = getTenant();

//   // Toggle module expand/collapse
//   const toggleModule = (id) => {
//     setExpandedModules((prev) => {
//       const newSet = new Set(prev);
//       newSet.has(id) ? newSet.delete(id) : newSet.add(id);
//       return newSet;
//     });
//   };

//   // Fetch company info + menus
//   useEffect(() => {
//     const fetchCompanyAndMenu = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         let company = JSON.parse(localStorage.getItem("company"));

//         // If company not in localStorage, fetch by tenant
//         if (!company) {
//           const res = await fetch(`/api/companies/tenant`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Tenant: tenant,
//             },
//           });
//           const data = await res.json();
//           company = data.company; // take the "company" object
//           localStorage.setItem("company", JSON.stringify(company));
//         }

//         if (!company?.id) {
//           console.error("Sidebar fetch error: company not found");
//           return;
//         }

//         // Fetch company to get theme
//         const companyRes = await fetch(
//           `http://${tenant}.localhost/api/companies/${company.id}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const companyData = await companyRes.json();
//         if (companyData?.theme) setTheme(companyData.theme);

//         // Fetch modules + menus
//         const [modulesRes, menusRes] = await Promise.all([
//           fetch(`http://${tenant}.localhost/api/modules/company/${company.id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           fetch(`http://${tenant}.localhost/api/menus/module/${company.id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         const modulesData = await modulesRes.json();
//         const menusData = await menusRes.json();

//         // ✅ Normalize responses
//         const modulesArray = Array.isArray(modulesData)
//           ? modulesData
//           : Array.isArray(modulesData.modules)
//           ? modulesData.modules
//           : [];

//         const menusArray = Array.isArray(menusData)
//           ? menusData
//           : Array.isArray(menusData.menus)
//           ? menusData.menus
//           : [];

//         if (!Array.isArray(modulesArray)) {
//           console.error("Sidebar fetch error: modulesData not an array", modulesData);
//         }
//         if (!Array.isArray(menusArray)) {
//           console.error("Sidebar fetch error: menusData not an array", menusData);
//         }

//         // Deduplicate modules by name
//         const uniqueModules = modulesArray.filter(
//           (mod, index, self) =>
//             index === self.findIndex((m) => m.module_name === mod.module_name)
//         );

//         // Blacklist menus
//         const menuBlacklist = ["Add Employee"];

//         // Group menus under modules
//         const grouped = uniqueModules
//           .map((mod) => ({
//             ...mod,
//             items: menusArray.filter(
//               (m) =>
//                 m.module_id === mod.id && !menuBlacklist.includes(m.module_name)
//             ),
//           }))
//           .filter((mod) => mod.items.length > 0);

//         setGroupedMenu(grouped);
//       } catch (err) {
//         console.error("Sidebar fetch error:", err);
//         setGroupedMenu([]); // fallback
//       }
//     };

//     fetchCompanyAndMenu();
//   }, [tenant]);

//   // Map backend menu names to routes
//   const routeMap = {
//     "Employee List": "/applicants",
//     Payslips: "/payslips",
//     "Clock In/Out": "/clock-in-out",
//     "Time Reports": "/time-reports",
//     Settings: "/settings",
//   };

//   const getRoute = (menuName) =>
//     routeMap[menuName] ||
//     `/${menuName.toLowerCase().replace(/\s+/g, "-")}`;

//   // Pick theme colors
//   const colors = colorMap[theme] || colorMap.red;

//   return (
//     <aside
//       className={`h-screen bg-white shadow-md p-4 fixed top-0 left-0 flex flex-col transition-all duration-300 z-40
//         ${isCollapsed ? "w-20" : "w-60"}`}
//     >
//       {/* Logo + Collapse button */}
//       <div className="flex items-center justify-between mb-6">
//         <Link to="/" className="flex items-center">
//           {logo && (
//             <img
//               src={logo}
//               alt="Company Logo"
//               className={`transition-all duration-300 ${
//                 isCollapsed ? "w-10 mx-auto" : "w-36"
//               }`}
//             />
//           )}
//         </Link>
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="text-gray-500 hover:text-red-500"
//         >
//           {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex flex-col gap-2 text-sm overflow-y-auto flex-1">
//         {/* Static Dashboard */}
//         <NavItem to="/" icon={<Home size={20} />} label="Dashboard" collapsed={isCollapsed} colors={colors} />

//         {/* Static Applicants Dummy test link */}
//         <NavItem to="/applicants-dummy" label="Applicants Dummy" collapsed={isCollapsed} colors={colors} />

//         {/* Dynamic modules */}
//         {groupedMenu.map((mod) => {
//           const isExpanded = expandedModules.has(mod.id);
//           return (
//             <div key={mod.id}>
//               {/* Module header */}
//               {!isCollapsed && (
//                 <div
//                   onClick={() => toggleModule(mod.id)}
//                   className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer font-medium transition-all
//                     ${isExpanded ? colors.active : `text-gray-700 ${colors.hover}`}`}
//                 >
//                   <span className="truncate">{mod.module_name}</span>
//                   <span className="ml-auto">
//                     {isExpanded ? (
//                       <ChevronDown size={16} />
//                     ) : (
//                       <ChevronRightIcon size={16} />
//                     )}
//                   </span>
//                 </div>
//               )}

//               {/* Submenu items */}
//               {isExpanded &&
//                 !isCollapsed &&
//                 mod.items.map((item) => (
//                   <NavItem
//                     key={item.id}
//                     to={getRoute(item.name)}
//                     label={item.name}
//                     collapsed={isCollapsed}
//                     colors={colors}
//                   />
//                 ))}
//             </div>
//           );
//         })}
//       </nav>

//       {/* Footer items */}
//       <div className="mt-auto flex flex-col gap-2 text-sm">
//         <NavItem to="/help" icon={<HelpCircle size={20} />} label="Help" collapsed={isCollapsed} colors={colors} />
//         <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" collapsed={isCollapsed} colors={colors} />
//       </div>
//     </aside>
//   );
// };

// // NavItem component
// const NavItem = ({ to, icon, label, collapsed, badge, colors }) => (
//   <NavLink
//     to={to}
//     end
//     className={({ isActive }) =>
//       `flex items-center gap-3 px-3 py-2 rounded-md transition-all font-medium relative
//       ${isActive ? colors.active : `text-gray-700 ${colors.hover}`}`
//     }
//   >
//     {icon && <div className="w-5 h-5 flex-shrink-0">{icon}</div>}
//     {!collapsed && <span className="truncate">{label}</span>}

//     {/* Badge */}
//     {badge && !collapsed && (
//       <span
//         className={`ml-auto ${colors.badge} text-xs rounded-full px-2 py-1 min-w-[20px] text-center`}
//       >
//         {badge}
//       </span>
//     )}
//     {badge && collapsed && (
//       <span
//         className={`absolute -top-1 -right-1 ${colors.badge} text-xs rounded-full w-4 h-4 flex items-center justify-center`}
//       >
//         {badge}
//       </span>
//     )}
//   </NavLink>
// );

// export default Sidebar;


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

const colorMap = {
  red: { active: "bg-red-50 text-red-600 border-l-4 border-red-600", hover: "hover:bg-red-100", badge: "bg-red-500 text-white" },
  purple: { active: "bg-purple-50 text-purple-600 border-l-4 border-purple-600", hover: "hover:bg-purple-100", badge: "bg-purple-500 text-white" },
  blue: { active: "bg-blue-50 text-blue-600 border-l-4 border-blue-600", hover: "hover:bg-blue-100", badge: "bg-blue-500 text-white" },
};

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const logo = useCompanyLogo();
  const [groupedMenu, setGroupedMenu] = useState([]);
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [theme, setTheme] = useState("red");
  const tenant = getTenant();

  const toggleModule = (id) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const token = localStorage.getItem("token");
        let company = JSON.parse(localStorage.getItem("company"));

        // Fetch company info if not cached
        if (!company) {
          const res = await fetch(`/api/companies/tenant`, {
            headers: { Authorization: `Bearer ${token}`, Tenant: tenant },
          });
          const data = await res.json();
          company = data.company;
          localStorage.setItem("company", JSON.stringify(company));
        }

        if (!company?.id) {
          console.error("Sidebar fetch error: company not found");
          return;
        }

        // Fetch company theme
        const themeRes = await fetch(`http://${tenant}.localhost/api/companies/${company.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const themeData = await themeRes.json();
        if (themeData?.theme) setTheme(themeData.theme);

        // Fetch modules for company
        const modulesRes = await fetch(`http://${tenant}.localhost/api/modules/company/${company.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const modulesData = await modulesRes.json();
        const modulesArray = Array.isArray(modulesData)
          ? modulesData
          : Array.isArray(modulesData.modules)
          ? modulesData.modules
          : [];

        // Deduplicate modules
        const uniqueModules = modulesArray.filter(
          (mod, index, self) =>
            index === self.findIndex((m) => m.module_name === mod.module_name)
        );

        // Fetch menus for each module
        const modulesWithMenus = await Promise.all(
          uniqueModules.map(async (mod) => {
            const res = await fetch(`http://${tenant}.localhost/api/menus/module/${mod.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            const menusArray = Array.isArray(data)
              ? data
              : Array.isArray(data.menus)
              ? data.menus
              : [];
            return { ...mod, items: menusArray };
          })
        );

        // Blacklist menus if needed
        const menuBlacklist = ["Add Employee"];
        const grouped = modulesWithMenus
          .map(mod => ({ ...mod, items: mod.items.filter(m => !menuBlacklist.includes(m.module_name)) }))
          .filter(mod => mod.items.length > 0);

        setGroupedMenu(grouped);
      } catch (err) {
        console.error("Sidebar fetch error:", err);
        setGroupedMenu([]);
      }
    };

    fetchSidebarData();
  }, [tenant]);

  const routeMap = {
    "Employee List": "/applicants",
    Payslips: "/payslips",
    "Clock In/Out": "/clock-in-out",
    "Time Reports": "/time-reports",
    Settings: "/settings",
  };
  const getRoute = (menuName) => routeMap[menuName] || `/${menuName.toLowerCase().replace(/\s+/g, "-")}`;

  const colors = colorMap[theme] || colorMap.red;

  return (
    <aside className={`h-screen bg-white shadow-md p-4 fixed top-0 left-0 flex flex-col transition-all duration-300 z-40
      ${isCollapsed ? "w-20" : "w-60"}`}>
      
      {/* Logo + Collapse */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center">
          {logo && <img src={logo} alt="Company Logo" className={`transition-all duration-300 ${isCollapsed ? "w-10 mx-auto" : "w-36"}`} />}
        </Link>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-500 hover:text-red-500">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 text-sm overflow-y-auto flex-1">
        <NavItem to="/" icon={<Home size={20} />} label="Dashboard" collapsed={isCollapsed} colors={colors} />

        {groupedMenu.map(mod => {
          const isExpanded = expandedModules.has(mod.id);
          return (
            <div key={mod.id}>
              {!isCollapsed && (
                <div
                  onClick={() => toggleModule(mod.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer font-medium transition-all
                    ${isExpanded ? colors.active : `text-gray-700 ${colors.hover}`}`}
                >
                  <span className="truncate">{mod.module_name || mod.name}</span>
                  <span className="ml-auto">{isExpanded ? <ChevronDown size={16} /> : <ChevronRightIcon size={16} />}</span>
                </div>
              )}

              {isExpanded && !isCollapsed &&
                mod.items.map(item => (
                  <NavItem key={item.id} to={getRoute(item.module_name || item.name)} label={item.module_name || item.name} collapsed={isCollapsed} colors={colors} />
                ))
              }
            </div>
          );
        })}
      </nav>

      {/* Footer */}
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
    className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-all font-medium relative
      ${isActive ? colors.active : `text-gray-700 ${colors.hover}`}`}
  >
    {icon && <div className="w-5 h-5 flex-shrink-0">{icon}</div>}
    {!collapsed && <span className="truncate">{label}</span>}
    {badge && !collapsed && <span className={`ml-auto ${colors.badge} text-xs rounded-full px-2 py-1 min-w-[20px] text-center`}>{badge}</span>}
    {badge && collapsed && <span className={`absolute -top-1 -right-1 ${colors.badge} text-xs rounded-full w-4 h-4 flex items-center justify-center`}>{badge}</span>}
  </NavLink>
);

export default Sidebar;
