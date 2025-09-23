// src/pages/misc/Help.jsx
import { useState, useEffect } from "react";
import { MdEmail, MdHelpOutline, MdLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";
import { getTenant } from "../../utils/getTenant";

// Tailwind theme color map
const colorMap = {
  red: {
    bg: "bg-red-500",
    bgHover: "hover:bg-red-600",
    bgLight: "bg-red-50",
    text: "text-red-600",
  },
  purple: {
    bg: "bg-purple-500",
    bgHover: "hover:bg-purple-600",
    bgLight: "bg-purple-50",
    text: "text-purple-600",
  },
  blue: {
    bg: "bg-blue-500",
    bgHover: "hover:bg-blue-600",
    bgLight: "bg-blue-50",
    text: "text-blue-600",
  },
};

const Help = () => {
  const tenant = getTenant();
  const [themeColors, setThemeColors] = useState(null);

  // Fetch tenant theme
  useEffect(() => {
    const fetchTenantTheme = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`http://${tenant}.localhost/api/companies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const tenantCompany = data.allEmployees.find(
          (c) => c.tenant_name === tenant
        );

        if (tenantCompany?.theme && colorMap[tenantCompany.theme]) {
          setThemeColors(colorMap[tenantCompany.theme]);
        } else {
          setThemeColors(colorMap.red);
        }
      } catch (err) {
        console.error("Error fetching theme:", err);
        setThemeColors(colorMap.red);
      }
    };

    fetchTenantTheme();
  }, [tenant]);

  if (!themeColors) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-400 animate-pulse">
          Loading Help...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className={`flex items-center gap-3 ${themeColors.text}`}>
        <MdHelpOutline className="text-3xl" />
        <h1 className="text-3xl font-bold">Help & Support</h1>
      </div>

      <p className="text-gray-600">
        Need assistance? We're here to support you.
      </p>

      {/* Contact Support */}
      <div className={`bg-white shadow-md rounded-lg p-6 ${themeColors.bgLight}`}>
        <div className={`flex items-center gap-3 mb-2 text-gray-800`}>
          <MdEmail className={`text-2xl ${themeColors.text}`} />
          <h2 className="text-xl font-semibold">Contact Support</h2>
        </div>
        <p className="text-gray-600">
          Email us at{" "}
          <a
            href="mailto:support@yourcompany.com"
            className={`${themeColors.text} hover:underline font-medium`}
          >
            support@yourcompany.com
          </a>{" "}
          and we’ll get back to you within 24 hours.
        </p>
      </div>

      {/* FAQ + Docs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition ${themeColors.bgLight}`}
        >
          <div className="flex items-center gap-2 mb-2 text-gray-800">
            <MdLibraryBooks className={`text-xl ${themeColors.text}`} />
            <h3 className="text-lg font-semibold">Documentation</h3>
          </div>
          <p className="text-gray-600 mb-2">
            Explore guides and setup documentation.
          </p>
          <a
            href="#"
            className={`${themeColors.text} hover:underline font-medium`}
          >
            View Docs →
          </a>
        </div>

        <div
          className={`bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition ${themeColors.bgLight}`}
        >
          <div className="flex items-center gap-2 mb-2 text-gray-800">
            <MdHelpOutline className={`text-xl ${themeColors.text}`} />
            <h3 className="text-lg font-semibold">FAQ</h3>
          </div>
          <p className="text-gray-600 mb-2">
            Find answers to common questions.
          </p>
          <Link
            to="/faq"
            className={`${themeColors.text} hover:underline font-medium`}
          >
            Go to FAQ →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;

