// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { colorMap } from "../themes/colorMap";
import { apiBase } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { updateTheme } = useTheme();

  // Load user & company from localStorage on app start
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedCompany = localStorage.getItem("company");

      if (storedUser) setUser(JSON.parse(storedUser));

      if (storedCompany) {
        const company = JSON.parse(storedCompany);
        if (company?.theme && colorMap[company.theme]) {
          updateTheme(company.theme);
        }
      }
    } catch (err) {
      console.error("Failed to load auth data:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("company");
    }
  }, []);

  // Centralized login function
  const login = async (email, password) => {
    try {
      const res = await fetch(`${apiBase}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // Try to parse error message from backend
        let errorMsg = "Login failed";
        try {
          const errData = await res.json();
          if (errData?.message) errorMsg = errData.message;
        } catch {}
        throw new Error(errorMsg);
      }

      const data = await res.json();

      if (!data.user || !data.token) {
        throw new Error(data.message || "No User Found");
      }

      const userData = { ...data.user, token: data.token };
      setUser(userData);

      // Save user and company in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      if (data.company) localStorage.setItem("company", JSON.stringify(data.company));

      // Update theme if available
      if (data.company?.theme && colorMap[data.company.theme]) {
        updateTheme(data.company.theme);
      }

      return userData;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // Fetch company theme dynamically when user logs in
  useEffect(() => {
    const fetchCompanyTheme = async () => {
      if (!user?.token) return;

      try {
        const res = await fetch(`${apiBase}/companies/tenant-theme`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!res.ok) throw new Error(`Theme fetch failed: ${res.status}`);

        const company = await res.json();
        localStorage.setItem("company", JSON.stringify(company));

        if (company?.theme && colorMap[company.theme]) {
          updateTheme(company.theme);
        }
      } catch (err) {
        console.error("Failed to fetch company theme:", err);
      }
    };

    fetchCompanyTheme();
  }, [user?.token, updateTheme]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    updateTheme("default");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
