import { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "./ThemeContext"; 
import { colorMap } from "../themes/colorMap";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { updateTheme } = useTheme();

  // Load user & company from localStorage on first render
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
  }, []); // ✅ no need to depend on updateTheme

  const login = (userData, company) => {
    setUser(userData);

    // ✅ save user + company to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("company", JSON.stringify(company));

    if (company?.theme && colorMap[company.theme]) {
      updateTheme(company.theme);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("company");

    // ✅ reset theme to default
    updateTheme("default");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
