// ENHANCED ATS SIDEBAR
// src/components/Sidebar.jsx
import {
  Home,
  Briefcase,
  Users,
  Settings,
  HelpCircle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Calendar,
  UserCheck,
  Shield,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import useCompanyLogo from "../hooks/useCompanyLogo";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const logo = useCompanyLogo();

  return (
    <aside
      className={`h-screen bg-white shadow-md p-4 fixed top-0 left-0 flex flex-col transition-all duration-300 z-40 ${
        collapsed ? "w-20" : "w-60"
      }`}
    >
      {/* Logo & Arrow Toggle */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center">
          {logo && (
            <img
              src={logo}
              alt="Company Logo"
              className={`transition-all duration-300 ${
                collapsed ? "w-10 mx-auto" : "w-36"
              }`}
            />
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-red-500"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 text-sm overflow-y-auto flex-1">
        {/* Core Navigation */}
        <NavItem to="/" icon={<Home size={20} />} label="Dashboard" collapsed={collapsed} />
        
        {/* Jobs & Positions */}
        <NavItem to="/positions" icon={<Briefcase size={20} />} label="Positions" collapsed={collapsed} />
        
        {/* Candidates & Applications */}
        <NavItem to="/applicants" icon={<Users size={20} />} label="Applicants" collapsed={collapsed} />
        
        {/* Interviews */}
        <NavItem to="/interviews" icon={<Calendar size={20} />} label="Interviews" collapsed={collapsed} />
        <NavItem to="/interview-feedback" icon={<UserCheck size={20} />} label="Interview Feedback" collapsed={collapsed} />
        
        {/* Reports */}
        <NavItem to="/reports" icon={<BarChart3 size={20} />} label="Reports" collapsed={collapsed} />
      </nav>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-2 text-sm">
        <NavItem to="/help" icon={<HelpCircle size={20} />} label="Help" collapsed={collapsed} />
        <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" collapsed={collapsed} />
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon, label, collapsed, badge }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md transition-all font-medium relative ${
          isActive
            ? "bg-red-50 text-red-600 border-l-4 border-red-600"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      <div className="w-5 h-5 flex-shrink-0">{icon}</div>
      {!collapsed && <span className="truncate">{label}</span>}
      
      {/* Badge for notifications/counts */}
      {badge && !collapsed && (
        <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
          {badge}
        </span>
      )}
      {badge && collapsed && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default Sidebar;