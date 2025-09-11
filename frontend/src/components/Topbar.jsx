// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getTenant } from "../utils/getTenant";
// import { useTheme } from "../context/ThemeContext";
// import ProfileImage from "./ProfileImage";

// const Topbar = ({ collapsed }) => {
//   const [open, setOpen] = useState(false);
//   const [company, setCompany] = useState(null);
//   const [userRole, setUserRole] = useState("Loading..."); // Dynamic role state
//   const [roleLoading, setRoleLoading] = useState(true);
//   const dropdownRef = useRef();
//   const navigate = useNavigate();
//   const tenant = getTenant();
//   const { theme, loading } = useTheme();

//   // 🔹 Load tenant info
//   useEffect(() => {
//     const fetchTenant = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch(`/api/companies`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await res.json();

//         const companyData = data.allEmployees.find(
//           (c) => c.tenant_name.toLowerCase() === tenant.toLowerCase()
//         );

//         if (companyData) {
//           setCompany(companyData);
//           localStorage.setItem("tenant", JSON.stringify(companyData));
//         }
//       } catch (err) {
//         console.error("Error fetching tenant:", err);
//       }
//     };

//     fetchTenant();
//   }, [tenant]);

//   // 🔹 Fetch user's dynamic role from APIs
//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const user = JSON.parse(localStorage.getItem("user"));
        
//         if (!user || !token) {
//           setUserRole("Guest");
//           setRoleLoading(false);
//           return;
//         }

//         // Fetch roles and departments in parallel
//         const [rolesResponse, departmentsResponse] = await Promise.all([
//           fetch('/api/roles', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }),
//           fetch('/api/departments', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           })
//         ]);

//         if (!rolesResponse.ok || !departmentsResponse.ok) {
//           throw new Error('Failed to fetch role data');
//         }

//         const roles = await rolesResponse.json();
//         const departments = await departmentsResponse.json();

//         let resolvedRole = "User"; // fallback

//         // Method 1: If user has direct roleId
//         if (user.roleId) {
//           const roleData = roles.find(role => role.id === user.roleId);
//           resolvedRole = roleData?.name || resolvedRole;
//         }
//         // Method 2: If user has departmentId and role is nested in department
//         else if (user.departmentId) {
//           const department = departments.find(dept => dept.id === user.departmentId);
//           if (department && department.roles) {
//             // If department has multiple roles and user has a specific roleId within department
//             if (user.roleId) {
//               const departmentRole = department.roles.find(role => role.id === user.roleId);
//               resolvedRole = departmentRole?.name || resolvedRole;
//             }
//             // If department has a default role
//             else if (department.defaultRole) {
//               resolvedRole = department.defaultRole.name || resolvedRole;
//             }
//             // If department has roles array, take first one as default
//             else if (department.roles.length > 0) {
//               resolvedRole = department.roles[0].name || resolvedRole;
//             }
//           }
//         }
//         // Method 3: If user has a role field that needs to be matched with roles API
//         else if (user.role) {
//           // If user.role is a string, try to find matching role in roles API
//           if (typeof user.role === 'string') {
//             const roleData = roles.find(role => 
//               role.name.toLowerCase() === user.role.toLowerCase()
//             );
//             resolvedRole = roleData?.name || user.role;
//           }
//           // If user.role is an object with name
//           else if (user.role.name) {
//             resolvedRole = user.role.name;
//           }
//         }

//         setUserRole(resolvedRole);
        
//         // Optionally update localStorage with resolved role for caching
//         const updatedUser = { ...user, resolvedRole };
//         localStorage.setItem("user", JSON.stringify(updatedUser));

//       } catch (error) {
//         console.error("Error fetching user role:", error);
//         // Fallback to localStorage role if API fails
//         try {
//           const user = JSON.parse(localStorage.getItem("user"));
//           setUserRole(user?.role || "User");
//         } catch {
//           setUserRole("User");
//         }
//       } finally {
//         setRoleLoading(false);
//       }
//     };

//     fetchUserRole();
//   }, []); // Run once on component mount

//   // 🔹 Default company name
//   let companyName = company?.name || "Tenant";

//   // 🔹 Get user info automatically from localStorage
//   let email = "guest@example.com";
//   let role = roleLoading ? "Loading..." : userRole; // Use dynamic role
//   let initial = "G";
//   let userId = null;

//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       email = user.email || email;
//       initial = email.charAt(0).toUpperCase();
//       userId = user.id;
//     }
//   } catch (error) {
//     console.warn("Invalid user data in localStorage:", error);
//   }

//   // 🔹 Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleNavigate = (path) => {
//     navigate(path);
//     setOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("tenant");
//     navigate("/login");
//   };

//   if (loading) {
//     return (
//       <header
//         className={`fixed top-0 z-10 h-16 shadow-md border-b flex items-center justify-between px-6 transition-all duration-300 ${
//           collapsed ? "left-20" : "left-60"
//         } right-0`}
//         style={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
//       >
//         <span className="font-semibold text-xl text-gray-400">Loading...</span>
//       </header>
//     );
//   }

//   return (
//     <header
//       className={`fixed top-0 z-10 h-16 shadow-md border-b flex items-center justify-between px-6 transition-all duration-300 ${
//         collapsed ? "left-20" : "left-60"
//       } right-0`}
//       style={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
//     >
//       {/* Branding */}
//       <div className="flex items-center space-x-3">
//         <span
//           className="font-semibold text-xl"
//           style={{ color: theme }}
//         >
//           {companyName} Overview
//         </span>
//       </div>

//       {/* Profile + Dropdown */}
//       <div className="relative" ref={dropdownRef}>
//         <button
//           onClick={() => setOpen((prev) => !prev)}
//           className="flex items-center gap-3 focus:outline-none group cursor-pointer"
//         >
//           <ProfileImage userId={userId} initial={initial} />

//           <div className="text-sm text-gray-700 text-left hidden sm:block">
//             <p className="font-medium">
//               {userId ? JSON.parse(localStorage.getItem("user"))?.username || "Guest" : "Guest"}
//             </p>
//             <p className="text-xs text-gray-500">
//               {roleLoading ? (
//                 <span className="animate-pulse">Loading role...</span>
//               ) : (
//                 role
//               )}
//             </p>
//           </div>

//           <svg
//             className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
//               open ? "rotate-180" : ""
//             }`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </button>

//         {/* Dropdown */}
//         <div
//           className={`absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-xl z-50 transition-all duration-200 transform origin-top ${
//             open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
//           }`}
//         >
//           <ul className="py-1 text-sm text-gray-700">
//             <li>
//               <button
//                 onClick={() => handleNavigate("/profile")}
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Profile
//               </button>
//             </li>
//             {(userRole === "Admin" || userRole === "Administrator") && ( // Check dynamic role
//               <li>
//                 <button
//                   onClick={() => handleNavigate("/settings")}
//                   className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//                 >
//                   Settings
//                 </button>
//               </li>
//             )}
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="block px-4 py-2 hover:bg-red-100 w-full text-left text-red-600 transition-colors"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Topbar;



// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTheme } from "../context/ThemeContext";
// import ProfileImage from "./ProfileImage";

// const Topbar = ({ collapsed }) => {
//   const [open, setOpen] = useState(false);
//   const [userRole, setUserRole] = useState("Loading...");
//   const [roleLoading, setRoleLoading] = useState(true);
//   const dropdownRef = useRef();
//   const navigate = useNavigate();
//   const { theme, loading } = useTheme();

//   // ✅ Get company directly from localStorage (set in AuthContext on login)
//   const company = JSON.parse(localStorage.getItem("company")) || null;
//   const companyName = company?.name || "Tenant";

//   // ✅ Get user info
//   let email = "guest@example.com";
//   let role = roleLoading ? "Loading..." : userRole;
//   let initial = "G";
//   let userId = null;

//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       email = user.email || email;
//       initial = email.charAt(0).toUpperCase();
//       userId = user.id;
//     }
//   } catch (error) {
//     console.warn("Invalid user data in localStorage:", error);
//   }

//   // 🔹 Fetch user role
//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user || !token) {
//           setUserRole("Guest");
//           setRoleLoading(false);
//           return;
//         }

//         const res = await fetch("/api/roles", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) throw new Error("Failed to fetch roles");
//         const roles = await res.json();

//         const roleData = roles.find((r) => r.id === user.roleId);
//         setUserRole(roleData?.name || "User");
//       } catch (err) {
//         console.error("Error fetching role:", err);
//         setUserRole("User");
//       } finally {
//         setRoleLoading(false);
//       }
//     };

//     fetchUserRole();
//   }, []);

//   // 🔹 Dropdown close outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   if (loading) {
//     return (
//       <header
//         className={`fixed top-0 z-10 h-16 shadow-md border-b flex items-center justify-between px-6 transition-all duration-300 ${
//           collapsed ? "left-20" : "left-60"
//         } right-0`}
//       >
//         <span className="font-semibold text-xl text-gray-400">Loading...</span>
//       </header>
//     );
//   }

//   return (
//     <header
//       className={`fixed top-0 z-10 h-16 shadow-md border-b flex items-center justify-between px-6 transition-all duration-300 ${
//         collapsed ? "left-20" : "left-60"
//       } right-0`}
//     >
//       {/* Company Title with THEME COLOR */}
//       <div className="flex items-center space-x-3">
//         <span className="font-semibold text-xl" style={{ color: theme }}>
//           {companyName} Overview
//         </span>
//       </div>

//       {/* Profile Dropdown */}
//       <div className="relative" ref={dropdownRef}>
//         <button
//           onClick={() => setOpen((prev) => !prev)}
//           className="flex items-center gap-3 focus:outline-none"
//         >
//           <ProfileImage userId={userId} initial={initial} />
//           <div className="text-sm text-gray-700 text-left hidden sm:block">
//             <p className="font-medium">
//               {userId ? JSON.parse(localStorage.getItem("user"))?.username || "Guest" : "Guest"}
//             </p>
//             <p className="text-xs text-gray-500">{role}</p>
//           </div>
//           <svg
//             className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
//               open ? "rotate-180" : ""
//             }`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </button>

//         {open && (
//           <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-xl z-50">
//             <ul className="py-1 text-sm text-gray-700">
//               <li>
//                 <button
//                   onClick={() => navigate("/profile")}
//                   className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//                 >
//                   Profile
//                 </button>
//               </li>
//               {(userRole === "Admin" || userRole === "Administrator") && (
//                 <li>
//                   <button
//                     onClick={() => navigate("/settings")}
//                     className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//                   >
//                     Settings
//                   </button>
//                 </li>
//               )}
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="block px-4 py-2 hover:bg-red-100 w-full text-left text-red-600"
//                 >
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Topbar;



import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, X, User, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ProfileImage from "./ProfileImage";

const Topbar = ({ collapsed }) => {
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userRole, setUserRole] = useState("Loading...");
  const [roleLoading, setRoleLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  
  const dropdownRef = useRef();
  const notificationsRef = useRef();
  const navigate = useNavigate();
  const { theme, loading } = useTheme();

  // ✅ Get company directly from localStorage (set in AuthContext on login)
  const company = JSON.parse(localStorage.getItem("company")) || null;
  const companyName = company?.name || "Tenant";

  // ✅ Get user info
  let email = "guest@example.com";
  let role = roleLoading ? "Loading..." : userRole;
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

  // 🔹 Fetch user role
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

        const res = await fetch("/api/roles", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch roles");
        const roles = await res.json();

        const roleData = roles.find((r) => r.id === user.roleId);
        setUserRole(roleData?.name || "User");
      } catch (err) {
        console.error("Error fetching role:", err);
        setUserRole("User");
      } finally {
        setRoleLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  // // 🔹 Fetch notifications
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         setNotificationsLoading(false);
  //         return;
  //       }

  //       // Replace with your actual notifications API endpoint
  //       const res = await fetch("/api/notifications", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       if (!res.ok) throw new Error("Failed to fetch notifications");
  //       const data = await res.json();
        
  //       setNotifications(data.notifications || []);
  //       setUnreadCount(data.unreadCount || 0);
  //     } catch (err) {
  //       console.error("Error fetching notifications:", err);
  //       // Mock data for demonstration
  //       setNotifications([
  //         {
  //           id: 1,
  //           title: "New Application Received",
  //           message: "John Doe applied for Frontend Developer position",
  //           time: "5 minutes ago",
  //           read: false,
  //           type: "application"
  //         },
  //         {
  //           id: 2,
  //           title: "Interview Scheduled",
  //           message: "Interview with Sarah Johnson at 2:00 PM",
  //           time: "1 hour ago",
  //           read: false,
  //           type: "interview"
  //         },
  //         {
  //           id: 3,
  //           title: "Position Approved",
  //           message: "Backend Developer position has been approved",
  //           time: "2 hours ago",
  //           read: true,
  //           type: "approval"
  //         },
  //         {
  //           id: 4,
  //           title: "System Alert",
  //           message: "Server maintenance scheduled for tonight",
  //           time: "3 hours ago",
  //           read: false,
  //           type: "alert"
  //         }
  //       ]);
  //       setUnreadCount(3);
  //     } finally {
  //       setNotificationsLoading(false);
  //     }
  //   };

  //   fetchNotifications();
  // }, []);

  // 🔹 Load notifications (local mock only)
useEffect(() => {
  const mockNotifications = [
    {
      id: 1,
      title: "New Application Received",
      message: "John Doe applied for Frontend Developer position",
      time: "5 minutes ago",
      read: false,
      type: "application",
    },
    {
      id: 2,
      title: "Interview Scheduled",
      message: "Interview with Sarah Johnson at 2:00 PM",
      time: "1 hour ago",
      read: false,
      type: "interview",
    },
    {
      id: 3,
      title: "Position Approved",
      message: "Backend Developer position has been approved",
      time: "2 hours ago",
      read: true,
      type: "approval",
    },
    {
      id: 4,
      title: "System Alert",
      message: "Server maintenance scheduled for tonight",
      time: "3 hours ago",
      read: false,
      type: "alert",
    },
  ];

  setNotifications(mockNotifications);
  setUnreadCount(mockNotifications.filter((n) => !n.read).length);
  setNotificationsLoading(false);
}, []);


  // 🔹 Dropdown close outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      // Mark as read
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update local state
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, read: true }
            : notif
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error marking notification as read:", err);
      // For mock data, still update the UI
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, read: true }
            : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const clearAllNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/notifications/clear-all", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications([]);
      setUnreadCount(0);
      setNotificationsOpen(false);
    } catch (err) {
      console.error("Error clearing notifications:", err);
      // For mock data, still clear the UI
      setNotifications([]);
      setUnreadCount(0);
      setNotificationsOpen(false);
    }
  };

  const getNotificationIcon = (type) => {
    const iconProps = { size: 18, className: "text-gray-600" };
    
    switch (type) {
      case "application": 
        return <User {...iconProps} className="text-blue-600" />;
      case "interview": 
        return <Calendar {...iconProps} className="text-green-600" />;
      case "approval": 
        return <CheckCircle {...iconProps} className="text-emerald-600" />;
      case "alert":
        return <AlertCircle {...iconProps} className="text-yellow-600" />;
      default: 
        return <Bell {...iconProps} className="text-gray-500" />;
    }
  };

  const getNotificationBgColor = (type) => {
    switch (type) {
      case "application": return "bg-blue-50";
      case "interview": return "bg-green-50";
      case "approval": return "bg-emerald-50";
      case "alert": return "bg-yellow-50";
      default: return "bg-gray-50";
    }
  };

  if (loading) {
    return (
      <header
        className={`fixed top-0 z-10 h-16 shadow-md border-b flex items-center justify-between px-6 transition-all duration-300 ${
          collapsed ? "left-20" : "left-60"
        } right-0 bg-white`}
      >
        <span className="font-semibold text-xl text-gray-400">Loading...</span>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 z-10 h-16 shadow-md border-b flex items-center justify-between px-6 transition-all duration-300 ${
        collapsed ? "left-20" : "left-60"
      } right-0 bg-white`}
    >
      {/* Company Title with THEME COLOR */}
      <div className="flex items-center space-x-3">
        <span className="font-semibold text-xl" style={{ color: theme }}>
          {companyName} Overview
        </span>
      </div>

      {/* Right Side: Notifications + Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setNotificationsOpen(prev => !prev)}
            className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Notifications</h3>
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-xs text-red-600 hover:text-red-800 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {notificationsLoading ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <Bell className="mx-auto mb-2 text-gray-300" size={24} />
                    Loading notifications...
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <Bell className="mx-auto mb-2 text-gray-300" size={24} />
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 p-2 rounded-full ${getNotificationBgColor(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!notification.read ? "font-medium text-gray-900" : "text-gray-700"}`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-200">
                  <button
                    onClick={() => {
                      navigate("/notifications");
                      setNotificationsOpen(false);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium w-full text-center transition-colors"
                  >
                    View All Notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-3 focus:outline-none hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
          >
            <ProfileImage userId={userId} initial={initial} />
            <div className="text-sm text-gray-700 text-left hidden sm:block">
              <p className="font-medium">
                {userId ? JSON.parse(localStorage.getItem("user"))?.username || "Guest" : "Guest"}
              </p>
              <p className="text-xs text-gray-500">{role}</p>
            </div>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-xl z-50">
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left transition-colors"
                  >
                    Profile
                  </button>
                </li>
                {(userRole === "Admin" || userRole === "Administrator") && (
                  <li>
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left transition-colors"
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;