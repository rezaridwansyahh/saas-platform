// src/pages/Settings.jsx
import { useState } from "react";
import { useAuth } from '../hooks/useAuth';

const Settings = () => {
  const { getUser } = useAuth(); // ✅ correct usage
  const user = getUser();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-red-700">Settings</h1>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Account Info</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded">
              {user?.username || "Not logged in"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded">
              {user?.email || "example@email.com"}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded">
              {user?.role || "Admin"}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Change Password
          </button>

          <button
            onClick={() => setShowEditModal(true)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* 🔒 Change Password Modal */}
      {showPasswordModal && (
        <Modal title="Change Password" onClose={() => setShowPasswordModal(false)}>
          <form className="space-y-4">
            <input type="password" placeholder="Current Password" className="input" />
            <input type="password" placeholder="New Password" className="input" />
            <input type="password" placeholder="Confirm New Password" className="input" />
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 👤 Edit Profile Modal */}
      {showEditModal && (
        <Modal title="Edit Profile" onClose={() => setShowEditModal(false)}>
          <form className="space-y-4">
            <input
              type="text"
              defaultValue={user?.username || ""}
              placeholder="Username"
              className="input"
            />
            <input
              type="email"
              defaultValue={user?.email || ""}
              placeholder="Email"
              className="input"
            />
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
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
