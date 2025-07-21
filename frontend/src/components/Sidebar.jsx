import {
  Home,
  Briefcase,
  Users,
  Settings,
  HelpCircle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import logo from "../img/ptap_logo.png";

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <aside
      className={`h-screen bg-white shadow-md p-4 fixed top-0 left-0 flex flex-col transition-all duration-300 z-40 ${
        collapsed ? "w-20" : "w-60"
      }`}
    >
      {/* Logo & Arrow Toggle */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="PT Abhimata Persada"
            className={`transition-all duration-300 ${
              collapsed ? "w-10 mx-auto" : "w-36"
            }`}
          />
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-red-500"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 text-sm">
        <NavItem to="/" icon={<Home size={20} />} label="Dashboard" collapsed={collapsed} />
        <NavItem to="/jobs" icon={<Briefcase size={20} />} label="Jobs" collapsed={collapsed} />
        <NavItem to="/applicants" icon={<Users size={20} />} label="Applicants" collapsed={collapsed} />
        <NavItem to="/reports" icon={<BarChart3 size={20} />} label="Reports" collapsed={collapsed} />
      </nav>

      {/* Footer Section */}
      <div className="mt-auto flex flex-col gap-2 text-sm">
        <NavItem to="/help" icon={<HelpCircle size={20} />} label="Help" collapsed={collapsed} />
        <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" collapsed={collapsed} />
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md transition-all font-medium ${
          isActive
            ? "bg-red-50 text-red-600 border-l-4 border-red-600"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      <div className="w-5 h-5">{icon}</div>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
