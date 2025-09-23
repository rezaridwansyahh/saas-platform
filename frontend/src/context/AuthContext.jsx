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

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (storedCompany) {
        const company = JSON.parse(storedCompany);
        if (company?.theme && colorMap[company.theme]) {
          updateTheme(company.theme);
        }
      }
    } catch (error) {
      console.error("Failed to load auth data:", error);
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

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok || !data.token) {
        throw new Error(data.message || "Login failed");
      }

      const userData = { ...data.user, token: data.token }; // include token
      setUser(userData);

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("company", JSON.stringify(data.company));

      if (data.company?.theme && colorMap[data.company.theme]) {
        updateTheme(data.company.theme);
      }

      return userData; // allow caller to redirect after success
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // Fetch company theme dynamically
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
