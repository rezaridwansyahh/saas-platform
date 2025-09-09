// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ProfileImage from "../components/ProfileImage";

const Profile = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    }
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-gray-700">No user logged in</h2>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <h1
        className="text-3xl font-bold mb-8 flex items-center gap-2"
        style={{ color: theme }}
      >
        Profile
      </h1>

      {/* Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Avatar + Basic Info */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
          <ProfileImage
            userId={user.id}
            initial={user.email?.charAt(0).toUpperCase() || "U"}
            size="lg"
          />
          <p className="mt-4 text-lg font-semibold text-gray-800">
            {user.username || user.email}
          </p>
          <p className="text-sm text-gray-500">
            {user.resolvedRole || user.role || "User"}
          </p>
        </div>

        {/* Right: Details + Actions */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Role:</span>{" "}
              {user.resolvedRole || user.role || "Not assigned"}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate("/profile/edit")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
