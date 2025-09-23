//src/config/menuConfig.js

import { Home, Briefcase, Users, BarChart3, Settings, HelpCircle } from "lucide-react";

export const menus = {
  admin: [
    { to: "/", label: "Dashboard", icon: <Home size={20} /> },
    { to: "/positions", label: "Positions", icon: <Briefcase size={20} /> },
    { to: "/applicants", label: "Applicants", icon: <Users size={20} /> },
    { to: "/reports", label: "Reports", icon: <BarChart3 size={20} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ],
  user: [
    { to: "/", label: "Dashboard", icon: <Home size={20} /> },
    { to: "/positions", label: "Positions", icon: <Briefcase size={20} /> },
    { to: "/applicants", label: "My Applications", icon: <Users size={20} /> },
    { to: "/help", label: "Help", icon: <HelpCircle size={20} /> },
  ],
};