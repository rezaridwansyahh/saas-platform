// src/pages/RegisterEmployee.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const positions = [
  { id: 1, name: "Software Engineer" },
  { id: 2, name: "Product Manager" },
  { id: 3, name: "Designer" },
  { id: 4, name: "QA Tester" },
  { id: 5, name: "DevOps Engineer" },
  { id: 6, name: "HR Specialist" },
  { id: 7, name: "Marketing Analyst" },
  { id: 8, name: "Data Scientist" },
  { id: 9, name: "Sales Executive" },
  { id: 10, name: "Customer Support" },
];

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    positionId: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, positionId } = formData;

    if (!fullName || !email || !password || !positionId) {
      setError("Please fill out all the fields.");
      return;
    }

    // Store temporary in sessionStorage
    sessionStorage.setItem("pendingRegistration", JSON.stringify(formData));
    navigate("/register-user");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Register Employee
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-md"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-md"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-md"
        />

        <select
          name="positionId"
          value={formData.positionId}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-md"
        >
          <option value="">Select Position</option>
          {positions.map((pos) => (
            <option key={pos.id} value={pos.id}>
              {pos.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default RegisterEmployee;
