// src/pages/RegisterUserConfirm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterUserConfirm = () => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [pendingData, setPendingData] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("pendingRegistration");
    if (!saved) {
      navigate("/register");
    } else {
      setPendingData(JSON.parse(saved));
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailInput || !passwordInput) {
      setError("Please fill in both fields.");
      return;
    }

    if (
      !pendingData ||
      emailInput !== pendingData.email ||
      passwordInput !== pendingData.password
    ) {
      setError("Email or password doesn't match the one you registered.");
      return;
    }

    const finalUser = {
      fullName: pendingData.fullName,
      email: pendingData.email,
      password: pendingData.password, // Store securely in real apps
      positionId: pendingData.positionId,
    };

    localStorage.setItem("user", JSON.stringify(finalUser));
    sessionStorage.removeItem("pendingRegistration");

    alert("Registration successful!");
    navigate("/login");
  };

  if (!pendingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading registration info...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Confirm Account
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          className="w-full mb-4 p-3 border rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="w-full mb-6 p-3 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50"
        >
          Confirm & Finish
        </button>
      </form>
    </div>
  );
};

export default RegisterUserConfirm;
