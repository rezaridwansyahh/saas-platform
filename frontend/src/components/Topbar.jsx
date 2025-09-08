import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTenant } from "../utils/getTenant";
import { useTheme } from "../context/ThemeContext";
import ProfileImage from "./ProfileImage";

const Topbar = ({ collapsed }) => {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState(null);
  const [userRole, setUserRole] = useState("Loading..."); // Dynamic role state
  const [roleLoading, setRoleLoading] = useState(true);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const tenant = getTenant();
  const { theme, loading } = useTheme();

  // 🔹 Load tenant info
  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/companies`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        const companyData = data.allEmployees.find(
          (c) => c.tenant_name.toLowerCase() === tenant.toLowerCase()
        );

        if (companyData) {
          setCompany(companyData);
          localStorage.setItem("tenant", JSON.stringify(companyData));
        }
      } catch (err) {
        console.error("Error fetching tenant:", err);
      }
    };

    fetchTenant();
  }, [tenant]);

  // 🔹 Fetch user's dynamic role from APIs
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user || !token) {
          setUserRole("Guest");
          setRoleLoading(false);
          return;
        }

        // Fetch roles and departments in parallel
        const [rolesResponse, departmentsResponse] = await Promise.all([
          fetch('/api/roles', {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          fetch('/api/departments', {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        ]);

        if (!rolesResponse.ok || !departmentsResponse.ok) {
          throw new Error('Failed to fetch role data');
        }

        const roles = await rolesResponse.json();
        const departments = await departmentsResponse.json();

        let resolvedRole = "User"; // fallback

        // Method 1: If user has direct roleId
        if (user.roleId) {
          const roleData = roles.find(role => role.id === user.roleId);
          resolvedRole = roleData?.name || resolvedRole;
        }
        // Method 2: If user has departmentId and role is nested in department
        else if (user.departmentId) {
          const department = departments.find(dept => dept.id === user.departmentId);
          if (department && department.roles) {
            // If department has multiple roles and user has a specific roleId within department
            if (user.roleId) {
              const departmentRole = department.roles.find(role => role.id === user.roleId);
              resolvedRole = departmentRole?.name || resolvedRole;
            }
            // If department has a default role
            else if (department.defaultRole) {
              resolvedRole = department.defaultRole.name || resolvedRole;
            }
            // If department has roles array, take first one as default
            else if (department.roles.length > 0) {
              resolvedRole = department.roles[0].name || resolvedRole;
            }
          }
        }
        // Method 3: If user has a role field that needs to be matched with roles API
        else if (user.role) {
          // If user.role is a string, try to find matching role in roles API
          if (typeof user.role === 'string') {
            const roleData = roles.find(role => 
              role.name.toLowerCase() === user.role.toLowerCase()
            );
            resolvedRole = roleData?.name || user.role;
          }
          // If user.role is an object with name
          else if (user.role.name) {
            resolvedRole = user.role.name;
          }
        }

        setUserRole(resolvedRole);
        
        // Optionally update localStorage with resolved role for caching
        const updatedUser = { ...user, resolvedRole };
        localStorage.setItem("user", JSON.stringify(updatedUser));

      } catch (error) {
        console.error("Error fetching user role:", error);
        // Fallback to localStorage role if API fails
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          setUserRole(user?.role || "User");
        } catch {
          setUserRole("User");
        }
      } finally {
        setRoleLoading(false);
      }
    };

    fetchUserRole();
  }, []); // Run once on component mount

  // 🔹 Default company name
  let companyName = company?.name || "Tenant";

  // 🔹 Get user info automatically from localStorage
  let email = "guest@example.com";
  let role = roleLoading ? "Loading..." : userRole; // Use dynamic role
  let initial = "G";
  let userId = null;

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      email = user.email || email;
      initial = email.charAt(0).toUpperCase();
      userId = user.id;
    }
  } catch (error) {
    console.warn("Invalid user data in localStorage:", error);
  }

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("tenant");
    navigate("/login");
  };

  if (loading) {
    return (
      <header
        className={`fixed top-0 z-10 h-16 shadow-md border-b flex items-center justify-between px-6 transition-all duration-300 ${
          collapsed ? "left-20" : "left-60"
        } right-0`}
        style={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
      >
        <span className="font-semibold text-xl text-gray-400">Loading...</span>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 z-10 h-16 shadow-md border-b flex items-center justify-between px-6 transition-all duration-300 ${
        collapsed ? "left-20" : "left-60"
      } right-0`}
      style={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
    >
      {/* Branding */}
      <div className="flex items-center space-x-3">
        <span
          className="font-semibold text-xl"
          style={{ color: theme }}
        >
          {companyName} Overview
        </span>
      </div>

      {/* Profile + Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 focus:outline-none group cursor-pointer"
        >
          <ProfileImage userId={userId} initial={initial} />

          <div className="text-sm text-gray-700 text-left hidden sm:block">
            <p className="font-medium">
              {userId ? JSON.parse(localStorage.getItem("user"))?.username || "Guest" : "Guest"}
            </p>
            <p className="text-xs text-gray-500">
              {roleLoading ? (
                <span className="animate-pulse">Loading role...</span>
              ) : (
                role
              )}
            </p>
          </div>

          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown */}
        <div
          className={`absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-xl z-50 transition-all duration-200 transform origin-top ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button
                onClick={() => handleNavigate("/profile")}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                Profile
              </button>
            </li>
            {(userRole === "Admin" || userRole === "Administrator") && ( // Check dynamic role
              <li>
                <button
                  onClick={() => handleNavigate("/settings")}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  Settings
                </button>
              </li>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-red-100 w-full text-left text-red-600 transition-colors"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

