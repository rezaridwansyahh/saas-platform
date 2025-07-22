

// const Topbar = ({ collapsed }) => {
//   return (
//     <header
//       className={`fixed top-0 transition-all duration-300 z-10 h-16 shadow-md bg-white border-b border-gray-200 flex items-center justify-between px-6 ${
//         collapsed ? "left-20" : "left-60"
//       } right-0`}
//     >
//       {/* Left: Title or Branding */}
//       <div className="flex items-center space-x-3">
//         <span className="text-red-700 font-semibold text-xl">PTAP Overview</span>
//       </div>

//       {/* Right: Profile / Account */}
//       <div className="flex items-center gap-3">
//         <div className="w-9 h-9 rounded-full bg-red-200 flex items-center justify-center text-red-700 font-bold">
//           R
//         </div>
//         <div className="text-sm text-gray-700">
//           <p className="font-medium">Recruiter</p>
//           <p className="text-xs text-gray-500">Admin</p>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Topbar;



import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ collapsed }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    // ✅ Add your logout logic here
    localStorage.removeItem("user"); // example
    navigate("/login");
  };

  return (
    <header
      className={`fixed top-0 z-10 h-16 shadow-md bg-white border-b border-gray-200 flex items-center justify-between px-6 transition-all duration-300 ${
        collapsed ? "left-20" : "left-60"
      } right-0`}
    >
      {/* Left Branding */}
      <div className="flex items-center space-x-3">
        <span className="text-red-700 font-semibold text-xl">PTAP Overview</span>
      </div>

      {/* Right Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-red-200 flex items-center justify-center text-red-700 font-bold">
            T {/* TODO: Replace with dynamic initial */}
          </div>
          <div className="text-sm text-gray-700 text-left hidden sm:block">
            <p className="font-medium">testing1234</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <ul className="py-1 text-sm text-gray-700">
              <li>
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("/settings")}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
