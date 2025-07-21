// // const Topbar = ({ collapsed }) => {
// //   return (
// //     <header
// //       className={`fixed top-0 ${
// //         collapsed ? "left-20" : "left-60"
// //       } right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-10 transition-all duration-300`}
// //     >
// //       <h2 className="text-lg font-semibold">PTAP Overview</h2>
// //       <div className="flex items-center gap-3">
// //         <div className="w-8 h-8 rounded-full bg-gray-300" />
// //         <span className="text-sm text-gray-700">Recruiter</span>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Topbar;

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


// components/Topbar.jsx
// import { useState } from 'react';
// import { getUser, logout } from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
// import { FiUser } from 'react-icons/fi';

// const Topbar = () => {
//   const user = getUser();
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="bg-white h-16 flex items-center justify-end px-6 border-b relative">
//       {user ? (
//         <div className="relative">
//           <button
//             className="flex items-center space-x-2"
//             onClick={() => setOpen(!open)}
//           >
//             <FiUser size={20} />
//             <span className="font-medium">{user.username}</span>
//           </button>

//           {open && (
//             <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => navigate('/settings')}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Profile Settings
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <button
//           className="bg-red-500 text-white px-4 py-1 rounded"
//           onClick={() => navigate('/login')}
//         >
//           Login
//         </button>
//       )}
//     </div>
//   );
// };

// export default Topbar;


// components/Topbar.jsx
import { useState } from 'react';
import { getUser, logout } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

const Topbar = () => {
  const user = getUser();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-white h-16 flex items-center justify-end px-6 border-b relative z-50 shadow-sm">
      {user ? (
        <div className="relative">
          <button
            className="flex items-center space-x-2 hover:text-red-500 transition"
            onClick={() => setOpen(!open)}
          >
            <FiUser size={20} />
            <span className="font-medium">{user.username}</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/settings');
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Topbar;
