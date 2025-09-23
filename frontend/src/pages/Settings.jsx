import React, { useState, useEffect } from "react";
import { apiBase } from "../utils/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ProfileImage from "../components/ProfileImage";
import { Edit } from "lucide-react";


const Settings = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const token = localStorage.getItem("token"); // pastikan login nyimpen token
  const storedUser = JSON.parse(localStorage.getItem("user")); // simpan object user pas login

  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);

      // fetch employee untuk ambil username
      fetch(`${apiBase}/employees/${storedUser.employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("employee API response:", data); // cek isi res

          // ⚡ ambil object employee dari response
          setEmployee(data.employee);
          // setNewUsername(data.employee?.name || "");
        })
        .catch((err) => console.error(err));

      // setNewEmail(storedUser.email);
    }
  }, []);


  const handleSaveChanges = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // 🔎 Validasi email dengan regex
      if (newEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
          alert("Format email tidak valid. Contoh: something@domain.com");
          return;
        }
      }

      let updatedUser = { ...user };

      // 1. Update email (users)
      if (newEmail && newEmail !== user.email) {
        const url = `${apiBase}/users/${user.id}`;
        const userRes = await axios.put(url, { email: newEmail }, { headers });
        console.log("✅ Email updated:", userRes.data);

        // 🔄 update localStorage + state user
        updatedUser = { ...updatedUser, email: newEmail };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }

      // 2. Update password (users)
      if (newPassword && newPassword !== user.password) {
        const url = `${apiBase}/users/${user.id}`;
        const userRes = await axios.put(url, { password: newPassword }, { headers });
        console.log("✅ Password updated:", userRes.data);
      }

      // 3. Update username (employees)
      if (employee && newUsername && newUsername !== employee.name) {
        await axios.put(
          `${apiBase}/employees/${employee.employee_id}`,
          { name: newUsername },
          { headers }
        );
        console.log("✅ Username updated");
      }

      alert("Profile updated successfully!");

      console.log("username : ", newUsername)
      console.log("email : ", newEmail)
      // 🔄 Kosongkan input lagi (UI saja, DB tidak terhapus)
      setNewEmail("");
      setNewPassword("");
      setNewUsername("");

    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.status, error.response.data);
      } else {
        console.error("Network error:", error.message);
      }
      alert("Failed to update profile");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      setPreview(URL.createObjectURL(file)); // buat preview
    }
  };

  const handlePhotoUpload = async () => {
    try {
      if (!picture) return alert("Please select a photo first");

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("profile_picture", picture);

      const res = await fetch(`${apiBase}/employees/${user.employeeId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed: ${errorText}`);
      }

      const data = await res.json();
      console.log("✅ Upload success:", data);
      alert("Profile picture updated!");
      window.location.reload()
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Check console for details.");
    }
  };


  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1
        className="text-3xl font-bold mb-8 flex items-center gap-2"
        style={{ color: theme }}
      >
        Account Info
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        {/* Wrap dengan flex */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* Left: Avatar + Basic Info */}
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center md:w-1/3">
            <div
              onClick={() => setShowPhotoModal(true)}
              className="cursor-pointer hover:opacity-50 transition"
            >
              <ProfileImage
                userId={user?.id}
                initial={user?.email?.charAt(0).toUpperCase() || "U"}
                size="lg"
              />
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-800">
              {user?.username || user?.email}
            </p>
            <p className="text-sm text-gray-500">
              {user?.resolvedRole || user?.role || "User"}
            </p>
          </div>

          {/* Right: Form */}
          <div className="flex-1">


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter Username"
                  className="input bg-gray-100 text-gray-800 px-4 py-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter New Email"
                  className="input bg-gray-100 text-gray-800 px-4 py-2 rounded w-full"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition cursor-pointer"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
              >
                Change Password
              </button>

              <button
                type="button"
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* 🔒 Change Password Modal */}
      {showPasswordModal && (
        <Modal title="Change Password" onClose={() => setShowPasswordModal(false)}>
          <form className="space-y-4">
            <input type="password" placeholder="Current Password" className="input" />
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className="input" />
            <input type="password" placeholder="Confirm New Password" className="input" />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}
      {/* 📷 Edit Photo Modal */}
      {showPhotoModal && (
        <Modal title="Edit Profile Photo" onClose={() => setShowPhotoModal(false)}>
          <div className="space-y-4">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto border"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-gray-500">
                <ProfileImage
                  userId={user?.id}
                  initial={user?.email?.charAt(0).toUpperCase() || "U"}
                  size="xxl"
                />
              </div>
            )}

            <div className="flex flex-col items-center">
              <input id="fileUpload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              <label htmlFor="fileUpload" className="border bg-gray-300 text-gray-500 cursor-pointer px-20 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition" >
                  Choose File
              </label>
              
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePhotoUpload}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Reusable Modal Component
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

// Optional CSS for input styling
const inputStyle = `
  input.input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    outline: none;
    transition: border-color 0.2s;
  }
  input.input:focus {
    border-color: #ef4444;
  }
`;

export default function SettingsWrapper() {
  return (
    <>
      <style>{inputStyle}</style>
      <Settings />
    </>
  );
}
