import { Home, Briefcase, Users } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import logo from "../img/ptap_logo.png";

const Sidebar = () => {
  return (
    <aside className="w-60 h-screen bg-white shadow-md p-6 fixed top-0 left-0 flex flex-col">
      <Link to="/">
        <img
          src={logo}
          alt="PT Abhimata Persada"
          className="w-36 mb-10 mx-auto"
        />
      </Link>

      <nav className="flex flex-col gap-2">
        <NavItem to="/" icon={<Home size={18} />} label="Dashboard" />
        <NavItem to="/jobs" icon={<Briefcase size={18} />} label="Jobs" />
        <NavItem to="/applicants" icon={<Users size={18} />} label="Applicants" />
      </nav>
    </aside>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md transition-all font-medium
         ${
           isActive
             ? "bg-red-50 text-red-600 border-l-4 border-red-600"
             : "text-gray-700 hover:bg-gray-100"
         }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
};

export default Sidebar;
