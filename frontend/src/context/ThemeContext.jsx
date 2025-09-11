// // src/context/ThemeContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import { colorMap } from "../themes/colorMap";
// import { getTenant } from "../utils/getTenant";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(colorMap.black); // fallback
//   const [loading, setLoading] = useState(true);

//   const fetchTheme = async (tenantName) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         return colorMap.black;
//       }

//       const res = await fetch(`/api/companies`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error("Failed to fetch company themes");
//       const data = await res.json();

//       const company = data.allEmployees?.find(
//         (c) => c.tenant_name === tenantName
//       );

//       if (company?.theme) {
//         // check colorMap or use raw value
//         const selectedTheme = colorMap[company.theme] || company.theme;
//         localStorage.setItem("tenant-theme", JSON.stringify(selectedTheme));
//         return selectedTheme;
//       }

//       return colorMap.black;
//     } catch (error) {
//       console.error("Error fetching tenant theme:", error);
//       return colorMap.black;
//     }
//   };

//   useEffect(() => {
//     const tenantName = getTenant();
//     const cachedTheme = localStorage.getItem("tenant-theme");

//     if (cachedTheme) {
//       setTheme(JSON.parse(cachedTheme));
//       setLoading(false);
//     }

//     if (tenantName) {
//       fetchTheme(tenantName).then((selectedTheme) => {
//         setTheme(selectedTheme);
//         setLoading(false);
//       });
//     } else {
//       setTheme(colorMap.black);
//       setLoading(false);
//     }
//   }, []); // ✅ run once on mount

//   // 👇 allow both colorMap keys and direct color strings
//   const updateTheme = (newTheme) => {
//     const resolvedTheme = colorMap[newTheme] || newTheme;
//     setTheme(resolvedTheme);
//     localStorage.setItem("tenant-theme", JSON.stringify(resolvedTheme));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, updateTheme, loading }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);




// // src/context/ThemeContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import { colorMap } from "../themes/colorMap";
// import { getTenant } from "../utils/getTenant";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(colorMap.black); // fallback before login
//   const [loading, setLoading] = useState(true);

//   const fetchTheme = async (tenantName) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("⚠️ No token found, using fallback theme");
//         return colorMap.black;
//       }

//       const res = await fetch(`/api/companies`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // ✅ protected
//         },
//       });

//       if (!res.ok) throw new Error("Failed to fetch company themes");
//       const data = await res.json();

//       const company = data.allEmployees?.find(
//         (c) => c.tenant_name === tenantName
//       );

//       if (company?.theme) {
//         const selectedTheme = colorMap[company.theme] || colorMap.black;
//         return selectedTheme;
//       }

//       return colorMap.black;
//     } catch (error) {
//       console.error("Error fetching tenant theme:", error);
//       return colorMap.black;
//     }
//   };

//   useEffect(() => {
//     const tenantName = getTenant();

//     const token = localStorage.getItem("token");
//     if (!token || !tenantName) {
//       setTheme(colorMap.black);
//       setLoading(false);
//       return;
//     }

//     fetchTheme(tenantName).then((selectedTheme) => {
//       setTheme(selectedTheme);
//       setLoading(false);
//     });
//   }, []); // ✅ only run once on mount

//   const updateTheme = (newTheme) => {
//     const resolvedTheme = colorMap[newTheme] || colorMap.black;
//     setTheme(resolvedTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, updateTheme, loading }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);


// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { colorMap } from "../themes/colorMap";
import { getTenant } from "../utils/getTenant";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(colorMap.blue); // fallback
  const [loading, setLoading] = useState(true);

  // ✅ Fetch company theme from backend
  const fetchTheme = async (tenantName) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return colorMap.blue;

      const res = await fetch(`/api/companies`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch company theme");
      const data = await res.json();

      const company = data.allEmployees?.find(
        (c) => c.tenant_name === tenantName
      );

      if (company?.theme) {
        const selectedTheme = colorMap[company.theme] || company.theme;
        localStorage.setItem("tenant-theme", JSON.stringify(selectedTheme));
        return selectedTheme;
      }

      return colorMap.blue;
    } catch (err) {
      console.error("Error fetching theme:", err);
      return colorMap.blue;
    }
  };

  // ✅ Load theme on mount
  useEffect(() => {
    const tenantName = getTenant();
    const cachedTheme = localStorage.getItem("tenant-theme");

    if (cachedTheme) {
      setTheme(JSON.parse(cachedTheme));
      setLoading(false);
    }

    if (tenantName) {
      fetchTheme(tenantName).then((selectedTheme) => {
        setTheme(selectedTheme);
        setLoading(false);
      });
    } else {
      setTheme(colorMap.blue);
      setLoading(false);
    }
  }, []);

  // ✅ Listen for cross-tab/localStorage updates (login/logout/theme change)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "tenant-theme" && e.newValue) {
        setTheme(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // ✅ Public function to update immediately
  const updateTheme = (newTheme) => {
    const resolvedTheme = colorMap[newTheme] || newTheme;
    setTheme(resolvedTheme);
    localStorage.setItem("tenant-theme", JSON.stringify(resolvedTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
