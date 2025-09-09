// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    // Basic validations
    if (!fullName || !email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }

    if (!validateEmail(email)) {
      return setError("Please enter a valid email address.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    // Store mock user in localStorage
    const newUser = { fullName, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Register New Account
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
