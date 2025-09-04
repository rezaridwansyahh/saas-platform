
// //src/context/ThemeContext.jsx

// import { createContext, useContext, useEffect, useState } from "react";
// import { colorMap } from "../themes/colorMap"; 
// import { getTenant } from "../utils/getTenant";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(colorMap.blue); // Default fallback
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch theme from backend
//   const fetchTheme = async (tenantName) => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.warn("⚠️ No token found, using default theme");
//         setLoading(false);
//         return colorMap.blue; // or whatever your default should be
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

//       // ✅ Find the company by tenant_name
//       const company = data.allEmployees?.find(
//         (company) => company.tenant_name === tenantName
//       );

//       if (company && company.theme && colorMap[company.theme]) {
//         setLoading(false);
//         return colorMap[company.theme];
//       }

//       console.warn(`⚠️ Theme "${company?.theme}" not found in colorMap, using default`);
//       setLoading(false);
//       return colorMap.blue; // fallback

//     } catch (error) {
//       console.error("Error fetching tenant theme:", error);
//       setLoading(false);
//       return colorMap.blue; // fallback
//     }
//   };

//   // ✅ Run once on mount or when tenant changes
//   useEffect(() => {
//     const tenantName = getTenant(); // e.g. "c1", "c2", "c3"
    
//     if (tenantName) {
//       fetchTheme(tenantName).then(setTheme);
//     } else {
//       console.warn("⚠️ No tenant found");
//       setTheme(colorMap.blue);
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, loading }}>
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

  const fetchTheme = async (tenantName) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return colorMap.blue;
      }

      const res = await fetch(`/api/companies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch company themes");
      const data = await res.json();

      const company = data.allEmployees?.find(
        (c) => c.tenant_name === tenantName
      );

      if (company?.theme) {
        // check colorMap or use raw value
        const selectedTheme = colorMap[company.theme] || company.theme;
        localStorage.setItem("tenant-theme", JSON.stringify(selectedTheme));
        return selectedTheme;
      }

      return colorMap.blue;
    } catch (error) {
      console.error("Error fetching tenant theme:", error);
      return colorMap.blue;
    }
  };

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
  }, []); // ✅ run once on mount

  // 👇 allow both colorMap keys and direct color strings
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
